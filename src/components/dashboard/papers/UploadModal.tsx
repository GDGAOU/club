'use client';

import { Fragment, useState, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { PATHWAYS, modules } from '@/data/modules';
import { PAPER_TYPES, PaperType, SEMESTERS, Semester } from './types';
import { toast } from 'react-toastify';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[], metadata: PaperMetadata) => Promise<void>;
}

interface PaperMetadata {
  pathway: string;
  module: string;
  customModule?: {
    code: string;
    title: string;
  };
  moduleCode: string;
  moduleTitle: string;
  code: string;
  title: string;
  year: string;
  semester: Semester;
  type: PaperType;
  visibility: 'public' | 'private' | 'shared';
}

// Generate years from 2020 to current year
const YEARS = Array.from(
  { length: new Date().getFullYear() - 2019 },
  (_, i) => (2020 + i).toString()
);

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isCustomYear, setIsCustomYear] = useState(false);
  const [customYear, setCustomYear] = useState("");
  const [isCustomModule, setIsCustomModule] = useState(false);
  const [metadata, setMetadata] = useState<PaperMetadata>({
    pathway: PATHWAYS[0],
    module: '',
    moduleCode: '',
    moduleTitle: '',
    code: '',
    title: '',
    year: new Date().getFullYear().toString(),
    semester: 'Fall',
    type: 'midterm',
    visibility: 'private'
  });

  // Get modules for selected pathway
  const filteredModules = useMemo(() => {
    return modules.filter(module => 
      metadata.pathway === "all" || module.pathway.includes(metadata.pathway)
    );
  }, [metadata.pathway]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleModuleChange = (moduleCode: string) => {
    const selectedModule = modules.find(m => m.code === moduleCode);
    if (selectedModule) {
      setMetadata(prev => ({
        ...prev,
        module: moduleCode,
        moduleCode: selectedModule.code,
        moduleTitle: selectedModule.title,
        code: selectedModule.code,
        title: selectedModule.title
      }));
    } else if (isCustomModule) {
      setMetadata(prev => ({
        ...prev,
        module: moduleCode,
        moduleCode: moduleCode,
        moduleTitle: moduleCode,
        code: moduleCode,
        title: moduleCode,
      }));
    }
  };

  const handleCustomModuleChange = (field: 'code' | 'title', value: string) => {
    setMetadata(prev => ({
      ...prev,
      module: '',
      customModule: {
        ...prev.customModule,
        [field]: value
      },
      moduleCode: field === 'code' ? value : prev.customModule?.code || '',
      moduleTitle: field === 'title' ? value : prev.customModule?.title || '',
      code: field === 'code' ? value : prev.customModule?.code || '',
      title: field === 'title' ? value : prev.customModule?.title || ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate files
      if (!files.length) {
        toast.error('Please select a file to upload');
        return;
      }

      // Validate file types
      const invalidFiles = files.filter(file => !file.type.includes('pdf'));
      if (invalidFiles.length > 0) {
        toast.error('Only PDF files are allowed');
        return;
      }

      // Ensure all required fields are present
      const completeMetadata = {
        ...metadata,
        pathway: metadata.pathway || PATHWAYS[0],
        module: metadata.module,
        moduleCode: metadata.moduleCode || metadata.module,
        moduleTitle: metadata.moduleTitle || metadata.module,
        code: metadata.code || metadata.moduleCode || metadata.module,
        title: metadata.title || metadata.moduleTitle || metadata.module,
        year: metadata.year || new Date().getFullYear().toString(),
        semester: metadata.semester || 'Fall',
        type: metadata.type || 'midterm',
        visibility: metadata.visibility || 'private'
      };

      // Validate metadata
      if (!completeMetadata.moduleCode || !completeMetadata.moduleTitle) {
        toast.error('Please select a module');
        return;
      }

      if (!completeMetadata.year) {
        toast.error('Please select a year');
        return;
      }

      if (!completeMetadata.semester) {
        toast.error('Please select a semester');
        return;
      }

      if (!completeMetadata.type) {
        toast.error('Please select a paper type');
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading('Uploading file...');

      // Upload files
      await onUpload(files, completeMetadata);

      // Success
      toast.dismiss(loadingToast);
      toast.success('File uploaded successfully');
      onClose();
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload file');
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-neutral-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md text-neutral-400 hover:text-neutral-200"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 mb-4">
                      Upload Papers
                    </Dialog.Title>

                    {/* Drop Zone */}
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center mb-6 transition-colors ${
                        dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-neutral-700 hover:border-neutral-600'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        multiple
                      />
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-500 mx-auto flex items-center justify-center">
                          <ArrowUpTrayIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-lg font-medium">
                            Drop your files here or click to upload
                          </p>
                          <p className="text-neutral-400">
                            Only PDF files are supported
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Selected Files */}
                    {files.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-medium mb-2">Selected Files</h4>
                        <div className="space-y-2">
                          {Array.from(files).map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-neutral-800 rounded-lg p-3"
                            >
                              <span className="truncate">{file.name}</span>
                              <span className="text-sm text-neutral-400">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Metadata Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Pathway
                        </label>
                        <select
                          value={metadata.pathway}
                          onChange={(e) => {
                            setMetadata((prev) => ({
                              ...prev,
                              pathway: e.target.value,
                              module: '', // Reset module when pathway changes
                            }));
                          }}
                          className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                        >
                          {PATHWAYS.map((pathway) => (
                            <option key={pathway} value={pathway}>
                              {pathway}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium">
                            Module
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setIsCustomModule(!isCustomModule);
                              setMetadata(prev => ({
                                ...prev,
                                module: '',
                                customModule: undefined
                              }));
                            }}
                            className="text-sm text-blue-500 hover:text-blue-400"
                          >
                            {isCustomModule ? 'Select Existing Module' : 'Add Custom Module'}
                          </button>
                        </div>
                        
                        {isCustomModule ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              placeholder="Module Code (e.g., CS101)"
                              value={metadata.customModule?.code || ''}
                              onChange={(e) =>
                                handleCustomModuleChange('code', e.target.value)
                              }
                              className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                            />
                            <input
                              type="text"
                              placeholder="Module Title"
                              value={metadata.customModule?.title || ''}
                              onChange={(e) =>
                                handleCustomModuleChange('title', e.target.value)
                              }
                              className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                            />
                          </div>
                        ) : (
                          <select
                            value={metadata.module}
                            onChange={(e) => {
                              handleModuleChange(e.target.value);
                            }}
                            className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                          >
                            <option value="">Select a module</option>
                            {filteredModules
                              .sort((a, b) => a.code.localeCompare(b.code))
                              .filter((module, index, self) => 
                                index === self.findIndex((m) => m.code === module.code)
                              )
                              .map((module) => (
                                <option key={`${module.code}-${module.pathway[0]}`} value={module.code}>
                                  {module.code} - {module.title}
                                </option>
                              ))}
                          </select>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Year</label>
                          <div className="flex items-center space-x-2">
                            {!isCustomYear ? (
                              <select
                                value={metadata.year}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value === 'custom') {
                                    setIsCustomYear(true);
                                    setCustomYear(new Date().getFullYear().toString());
                                    setMetadata(prev => ({
                                      ...prev,
                                      year: new Date().getFullYear().toString()
                                    }));
                                  } else {
                                    setMetadata(prev => ({
                                      ...prev,
                                      year: value
                                    }));
                                  }
                                }}
                                className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                              >
                                <option value="custom">Custom Year</option>
                                {YEARS.map((year) => (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <div className="flex items-center space-x-2 w-full">
                                <input
                                  type="number"
                                  className="flex-1 bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                                  min="1900"
                                  max={new Date().getFullYear()}
                                  value={customYear}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setCustomYear(value);
                                    if (value && parseInt(value) >= 1900 && parseInt(value) <= new Date().getFullYear()) {
                                      setMetadata(prev => ({
                                        ...prev,
                                        year: value
                                      }));
                                    }
                                  }}
                                  placeholder="Enter year (1900-present)"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsCustomYear(false);
                                    setMetadata(prev => ({
                                      ...prev,
                                      year: new Date().getFullYear().toString()
                                    }));
                                  }}
                                  className="px-3 py-2 bg-neutral-800 rounded-lg border border-neutral-700 hover:bg-neutral-700"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Semester
                          </label>
                          <select
                            value={metadata.semester}
                            onChange={(e) =>
                              setMetadata((prev) => ({
                                ...prev,
                                semester: e.target.value as Semester,
                              }))
                            }
                            className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                          >
                            {SEMESTERS.map((semester) => (
                              <option key={semester} value={semester}>
                                {capitalize(semester)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Type</label>
                          <select
                            value={metadata.type}
                            onChange={(e) =>
                              setMetadata((prev) => ({
                                ...prev,
                                type: e.target.value as PaperType,
                              }))
                            }
                            className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                          >
                            {PAPER_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {capitalize(type)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Visibility
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          {(['private', 'public', 'shared'] as const).map((visibility) => (
                            <button
                              key={visibility}
                              type="button"
                              onClick={() =>
                                setMetadata((prev) => ({
                                  ...prev,
                                  visibility,
                                }))
                              }
                              className={`p-3 rounded-lg border ${
                                metadata.visibility === visibility
                                  ? 'bg-blue-500 border-blue-400 text-white'
                                  : 'border-neutral-700 hover:border-neutral-600'
                              }`}
                            >
                              <span className="block font-medium">
                                {capitalize(visibility)}
                              </span>
                              <span className="text-sm text-neutral-400">
                                {visibility === 'private'
                                  ? 'Only you can see'
                                  : visibility === 'public'
                                  ? 'Everyone can see'
                                  : 'Share with specific users'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 hover:bg-blue-600"
                        disabled={files.length === 0 || (!metadata.module && !metadata.customModule)}
                      >
                        Upload Papers
                      </Button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default UploadModal;
