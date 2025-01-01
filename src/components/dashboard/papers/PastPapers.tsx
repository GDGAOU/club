"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ArrowDownTrayIcon,
  DocumentPlusIcon,
  EyeIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { ExtendedPaper, PaperType, FilterCriteria } from './types';
import dynamic from 'next/dynamic';

interface UploadMetadata {
  moduleCode: string;
  moduleTitle: string;
  year: string;
  semester: string;
  type: PaperType;
  pathway: string;
  tags: string[];
  visibility: 'public' | 'private';
}

interface PastPapersProps {
  initialPapers?: ExtendedPaper[];
  isPublic?: boolean;
}

const DEFAULT_FILTER_CRITERIA: FilterCriteria = {
  dateRange: "all",
  fileSize: "all",
  rating: null,
  tags: [],
  customDateStart: undefined,
  customDateEnd: undefined,
};

export const PastPapers: React.FC<PastPapersProps> = ({
  initialPapers = [],
  isPublic = false,
}) => {
  // Modal States
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBatchUpload, setShowBatchUpload] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Paper States
  const [papers, setPapers] = useState<ExtendedPaper[]>(initialPapers);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPathway, setSelectedPathway] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState<"all" | PaperType>("all");
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>(DEFAULT_FILTER_CRITERIA);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedPaperForAction, setSelectedPaperForAction] = useState<ExtendedPaper | null>(null);

  // Fetch papers from MongoDB
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await fetch('/api/papers');
        if (!response.ok) {
          throw new Error('Failed to fetch papers');
        }
        const data = await response.json();
        setPapers(data.papers);
      } catch (error) {
        console.error('Error fetching papers:', error);
        toast.error('Failed to load papers');
      }
    };

    fetchPapers();
  }, []);

  // Load saved data from localStorage on client-side only
  useEffect(() => {
    const loadSavedData = () => {
      const savedFilters = localStorage.getItem('savedFilters');
      if (savedFilters) {
        // setSavedFilters(JSON.parse(savedFilters));
      }

      const recentlyViewed = localStorage.getItem('recentlyViewed');
      if (recentlyViewed) {
        // setRecentlyViewed(JSON.parse(recentlyViewed));
      }
    };

    loadSavedData();
  }, []);

  const handleUpload = async (files: File[], metadata: UploadMetadata) => {
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));
      formData.append('metadata', JSON.stringify(metadata));

      const response = await fetch('/api/papers/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      if (!data.success || !data.files) {
        throw new Error('Invalid response from server');
      }

      // Update papers list with new papers
      setPapers(prevPapers => [...data.files, ...prevPapers]);
      
      return data;
    } catch (error) {
      console.error('Upload error:', error);
      throw error; // Re-throw to be handled by the modal
    }
  };

  const handleBatchUpload = async (files: File[], metadata: UploadMetadata[]) => {
    try {
      const newPapers = files.map((file, index) => ({
        id: Math.random().toString(36).substr(2, 9),
        moduleCode: metadata[index].moduleCode,
        moduleTitle: metadata[index].moduleTitle,
        year: metadata[index].year,
        semester: metadata[index].semester,
        type: metadata[index].type,
        pathway: metadata[index].pathway,
        fileUrl: URL.createObjectURL(file),
        uploadedBy: 'Current User',
        uploadedAt: new Date(),
        downloads: 0,
        fileSize: file.size,
        tags: metadata[index].tags,
        rating: 0,
        comments: [],
        visibility: metadata[index].visibility
      }));

      setPapers(prevPapers => [...prevPapers, ...newPapers]);
      toast.success(`Successfully uploaded ${files.length} papers!`);
      setShowBatchUpload(false);
    } catch (error) {
      console.error('Batch upload error:', error);
      toast.error('Failed to upload papers');
    }
  };

  const filteredPapers = papers.filter(paper => {
    // Basic Filters
    if (selectedPathway !== "all" && paper.pathway !== selectedPathway) return false;
    if (selectedYear !== "all" && paper.year !== selectedYear) return false;
    if (selectedType !== "all" && paper.type !== selectedType) return false;

    // Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchString = `${paper.moduleCode} ${paper.moduleTitle} ${paper.type} ${paper.year} ${paper.pathway}`.toLowerCase();
      if (!searchString.includes(query)) return false;
    }

    // Advanced Filters
    if (showAdvancedFilters) {
      // Date Range
      if (filterCriteria.dateRange !== "all") {
        const uploadDate = new Date(paper.uploadedAt);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - uploadDate.getTime()) / (1000 * 60 * 60 * 24));

        switch (filterCriteria.dateRange) {
          case "last7":
            if (daysDiff > 7) return false;
            break;
          case "last30":
            if (daysDiff > 30) return false;
            break;
          case "last90":
            if (daysDiff > 90) return false;
            break;
          case "custom":
            if (filterCriteria.customDateStart && uploadDate < filterCriteria.customDateStart) return false;
            if (filterCriteria.customDateEnd && uploadDate > filterCriteria.customDateEnd) return false;
            break;
        }
      }

      // File Size
      if (filterCriteria.fileSize !== "all") {
        const sizeMB = paper.fileSize / (1024 * 1024);
        switch (filterCriteria.fileSize) {
          case "small":
            if (sizeMB > 1) return false;
            break;
          case "medium":
            if (sizeMB <= 1 || sizeMB > 5) return false;
            break;
          case "large":
            if (sizeMB <= 5) return false;
            break;
        }
      }

      // Rating
      if (filterCriteria.rating !== null && paper.rating < filterCriteria.rating) return false;

      // Tags
      if (filterCriteria.tags.length > 0 && paper.tags) {
        const hasAllTags = filterCriteria.tags.every(tag => paper.tags.includes(tag));
        if (!hasAllTags) return false;
      }
    }

    return true;
  });

  const renderPaperCard = (paper: ExtendedPaper) => {
    const uploadDate = new Date(paper.uploadedAt);
    const formattedDate = uploadDate.toLocaleDateString();

    return (
      <div key={paper._id} className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700">
        <div className="relative p-6">
          {/* Header Section */}
          <div className="mb-4">
            {/* Title Area */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="group">
                  <h3 className="text-lg font-semibold text-white mb-3 leading-snug h-[28px] flex items-center">
                    <span className="relative truncate block max-w-full" title={paper?.moduleTitle ? paper.moduleTitle : 'N/A'}>
                      {paper?.moduleTitle ? paper.moduleTitle : 'N/A'}
                    </span>
                  </h3>
                  <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-neutral-800 rounded-lg">
                    <span className="font-medium text-blue-400">
                      {paper?.moduleCode?.toUpperCase() || 'N/A'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
                    <span className="text-purple-400">
                      {paper?.type?.toUpperCase() || 'N/A'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
                    <span className="text-green-400">
                      {paper?.year || new Date().getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="shrink-0">
                <div className="px-2 py-1 bg-neutral-800/80 rounded text-xs text-neutral-400">
                  {new Date(paper?.uploadedAt || Date.now()).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="flex items-center justify-center gap-1.5 p-2 bg-neutral-800/50 rounded" title="Downloads">
                <ArrowDownTrayIcon className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-neutral-300">
                  {paper?.downloads?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 bg-neutral-800/50 rounded" title="Views">
                <EyeIcon className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-neutral-300">
                  {paper?.views?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 bg-neutral-800/50 rounded" title="File Size">
                <DocumentPlusIcon className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-neutral-300">
                  {paper?.fileSize ? `${(paper.fileSize / (1024 * 1024)).toFixed(1)} MB` : 'N/A'}
                </span>
              </div>
            </div>

            {/* Pathway */}
            {paper?.pathway && (
              <div className="mb-4 h-[32px] flex items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800/50 rounded-lg w-full">
                  <span className="text-yellow-400 text-sm truncate block w-full" title={paper.pathway.split('(')[0]?.trim() ? paper.pathway.split('(')[0].trim() : 'N/A'}>
                    {paper.pathway.split('(')[0]?.trim() ? paper.pathway.split('(')[0].trim() : 'N/A'}
                  </span>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="ghost"
                size="default"
                className="flex-1 h-11 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-medium"
              >
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                Download
              </Button>
              <Button
                variant="ghost"
                size="default"
                className="flex-1 h-11 bg-green-500/10 hover:bg-green-500/20 text-green-400 font-medium"
                onClick={() => {
                  setSelectedPaperForAction(paper);
                  setShowShareModal(true);
                }}
              >
                <ShareIcon className="w-5 h-5 mr-2" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="default"
                className={cn(
                  "h-11 w-11 flex items-center justify-center",
                  paper.visibility === 'public'
                    ? "bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400"
                    : "bg-purple-500/10 hover:bg-purple-500/20 text-purple-400"
                )}
              >
                {paper.visibility === 'public' ? (
                  <EyeIcon className="w-5 h-5" />
                ) : (
                  <EyeSlashIcon className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="default"
                className="h-11 w-11 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-400"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <TrashIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Search and Basic Filters */}
        <div className="flex-1 w-full md:w-auto space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              variant="outline"
              className={cn(
                "gap-2",
                showAdvancedFilters && "bg-blue-500/10 text-blue-400 border-blue-500/50"
              )}
            >
              Filters
            </Button>
          </div>

          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-neutral-900/50 rounded-lg border border-neutral-800">
              <select
                value={selectedPathway}
                onChange={(e) => setSelectedPathway(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"
              >
                <option value="all">All Pathways</option>
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"
              >
                <option value="all">All Years</option>
                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as "all" | PaperType)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"
              >
                <option value="all">All Types</option>
              </select>

              <Button
                onClick={() => {
                  setSelectedPathway("all");
                  setSelectedYear("all");
                  setSelectedType("all");
                  setFilterCriteria(DEFAULT_FILTER_CRITERIA);
                }}
                variant="ghost"
                className="text-neutral-400 hover:text-neutral-200"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* Upload Button */}
        {!isPublic && (
          <Button
            onClick={() => setShowUploadModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <DocumentPlusIcon className="w-4 h-4 mr-2" />
            Upload Papers
          </Button>
        )}
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-6 p-6 max-w-[1600px] mx-auto">
        {filteredPapers.length === 0 ? (
          <div className="col-span-full">
            <div className="flex flex-col items-center justify-center p-8 rounded-xl">
              <DocumentPlusIcon className="w-16 h-16 text-neutral-400 mb-4" />
              <h3 className="text-xl font-medium text-neutral-200 text-center">No papers found</h3>
              <p className="text-sm text-neutral-400 text-center mt-2 max-w-md">
                {searchQuery || selectedPathway !== "all" || selectedYear !== "all" || selectedType !== "all"
                  ? "Try adjusting your filters or search criteria"
                  : "Upload your first paper to get started"}
              </p>
              {!isPublic && (
                <Button
                  onClick={() => setShowUploadModal(true)}
                  className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <DocumentPlusIcon className="w-4 h-4 mr-2" />
                  Upload Paper
                </Button>
              )}
            </div>
          </div>
        ) : (
          filteredPapers.map(paper => renderPaperCard(paper))
        )}
      </div>

      {/* Modals */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-medium">Upload Paper</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Module Code</label>
                <input
                  type="text"
                  className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Module Title</label>
                <input
                  type="text"
                  className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Year</label>
                <select
                  className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Type</label>
                <select
                  className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                >
                  <option value="">Select Type</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Pathway</label>
                <select
                  className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                >
                  <option value="">Select Pathway</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Tags</label>
                <input
                  type="text"
                  className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Visibility</label>
                <select
                  className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  onClick={() => setShowUploadModal(false)}
                  className="bg-neutral-800 hover:bg-neutral-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleUpload([], {} as UploadMetadata)}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showBatchUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-medium">Batch Upload</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Files</label>
                <input
                  type="file"
                  multiple
                  className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Metadata</label>
                <input
                  type="text"
                  className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  onClick={() => setShowBatchUpload(false)}
                  className="bg-neutral-800 hover:bg-neutral-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleBatchUpload([], [] as UploadMetadata[])}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showShareModal && selectedPaperForAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-medium">Share Paper</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Link Expiry</label>
                <select
                  className="w-full bg-neutral-800 rounded-lg p-2 border border-neutral-700"
                  onChange={(e) => console.log(e.target.value)}
                >
                  <option value="1">24 Hours</option>
                  <option value="7">7 Days</option>
                  <option value="30">30 Days</option>
                  <option value="365">1 Year</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  onClick={() => {
                    setShowShareModal(false);
                    setSelectedPaperForAction(null);
                  }}
                  className="bg-neutral-800 hover:bg-neutral-700"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && selectedPaperForAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-medium">Delete Paper</h3>
            <p className="text-neutral-400">
              Are you sure you want to delete this paper? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-neutral-800 hover:bg-neutral-700"
              >
                Cancel
              </Button>
              <Button
                onClick={() => console.log('Delete paper')}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
