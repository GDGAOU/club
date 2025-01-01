"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ArchiveBoxIcon,
  ArchiveBoxArrowDownIcon,
  ArrowDownTrayIcon,
  DocumentPlusIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  ShareIcon,
  StarIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { PATHWAYS, modules } from '@/data/modules';
import { ExtendedPaper, PaperType, PAPER_TYPES, FilterCriteria } from './types';
import dynamic from 'next/dynamic';
import { getStorage, ref as storageRef, getDownloadURL } from '@firebase/storage';
import { doc, updateDoc, serverTimestamp, increment } from '@firebase/firestore';
import { db } from '@/lib/firebase';

// Dynamically import UploadModal with SSR disabled
const UploadModal = dynamic(() => import('./UploadModal'), { ssr: false });

interface PastPapersProps {
  initialPapers?: ExtendedPaper[];
  isPublic?: boolean;
  onPaperAction?: (action: string, paperId: string) => void;
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
  onPaperAction,
}) => {
  // Modal States
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showBatchUpload, setShowBatchUpload] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Paper States
  const [papers, setPapers] = useState<ExtendedPaper[]>(initialPapers);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch papers from MongoDB
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/papers');
        if (!response.ok) {
          throw new Error('Failed to fetch papers');
        }
        const data = await response.json();
        setPapers(data.papers);
      } catch (error) {
        console.error('Error fetching papers:', error);
        setError('Failed to load papers');
        toast.error('Failed to load papers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPapers();
  }, []);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPathway, setSelectedPathway] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState<"all" | PaperType>("all");
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>(DEFAULT_FILTER_CRITERIA);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [selectedPaperForAction, setSelectedPaperForAction] = useState<ExtendedPaper | null>(null);

  // Load saved data from localStorage on client-side only
  useEffect(() => {
    const loadSavedData = () => {
      const savedFilters = localStorage.getItem('savedFilters');
      if (savedFilters) {
        setSavedFilters(JSON.parse(savedFilters));
      }

      const recentlyViewed = localStorage.getItem('recentlyViewed');
      if (recentlyViewed) {
        setRecentlyViewed(JSON.parse(recentlyViewed));
      }
    };

    loadSavedData();
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('savedFilters', JSON.stringify(savedFilters));
  }, [savedFilters]);

  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const handleUpload = async (files: File[], metadata: any) => {
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

  const handleQuickUpload = async (file: File) => {
    try {
      if (file.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }

      const newPaper: ExtendedPaper = {
        id: Math.random().toString(36).substr(2, 9),
        moduleCode: 'AUTO-' + Math.random().toString(36).substr(2, 4).toUpperCase(),
        moduleTitle: file.name.replace('.pdf', ''),
        year: new Date().getFullYear().toString(),
        semester: 'Fall',
        type: 'midterm',
        pathway: selectedPathway,
        fileUrl: URL.createObjectURL(file),
        uploadedBy: 'Current User',
        uploadedAt: new Date(),
        downloads: 0,
        fileSize: file.size,
        tags: [],
        rating: 0,
        comments: []
      };

      setPapers(prevPapers => [...prevPapers, newPaper]);
      toast.success('Paper uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload paper');
    }
  };

  const handleBatchUpload = async (files: File[], metadata: any[]) => {
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

  const handleDownload = async (paper: ExtendedPaper) => {
    try {
      // Track download
      const response = await fetch(`/api/papers/${paper._id}/downloads`, {
        method: 'POST',
      });

      if (!response.ok) {
        console.error('Failed to track download');
      }

      // Update UI optimistically
      setPapers(prevPapers =>
        prevPapers.map(p =>
          p._id === paper._id
            ? { ...p, downloads: (p.downloads || 0) + 1 }
            : p
        )
      );

      // Open download link in new tab
      if (paper.downloadUrl) {
        window.open(paper.downloadUrl, '_blank');
      } else {
        toast.error('Download link not available');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download paper');
    }
  };

  const handleToggleVisibility = async (paper: ExtendedPaper) => {
    if (!paper._id) {
      console.error('Paper ID is missing');
      toast.error('Cannot update visibility: ID is missing');
      return;
    }

    try {
      const newVisibility = paper.visibility === 'public' ? 'private' : 'public';

      // Update UI immediately for better UX
      setPapers(prevPapers =>
        prevPapers.map(p =>
          p._id === paper._id
            ? { ...p, visibility: newVisibility }
            : p
        )
      );

      // Update visibility through API
      const response = await fetch(`/api/papers/${paper._id}/visibility`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ visibility: newVisibility }),
      });

      if (!response.ok) {
        throw new Error('Failed to update visibility');
      }

      toast.success(`Paper is now ${newVisibility}`);
    } catch (error) {
      // Revert UI change on error
      setPapers(prevPapers =>
        prevPapers.map(p =>
          p._id === paper._id
            ? { ...p, visibility: paper.visibility }
            : p
        )
      );
      console.error('Error toggling visibility:', error);
      toast.error('Failed to update visibility. Please try again.');
    }
  };

  const handleCreateShareableLink = async (paperId: string, expiryDays: number) => {
    try {
      const paper = papers.find(p => p._id === paperId);
      if (!paper) return;

      const newLink = {
        id: Math.random().toString(36).substr(2, 9),
        url: `${window.location.origin}/papers/shared/${paperId}?token=${Math.random().toString(36).substr(2, 16)}`,
        expiresAt: new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000),
        isActive: true,
        createdAt: new Date(),
        accessCount: 0
      };

      // Update UI optimistically
      setPapers(prev =>
        prev.map(p =>
          p._id === paperId
            ? { ...p, shareableLinks: [...(p.shareableLinks || []), newLink] }
            : p
        )
      );

      // Update in database
      const response = await fetch(`/api/papers/${paperId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: newLink }),
      });

      if (!response.ok) {
        throw new Error('Failed to create shareable link');
      }

      toast.success('Shareable link created!');
    } catch (error) {
      console.error('Error creating shareable link:', error);
      toast.error('Failed to create shareable link');
    }
  };

  const handleDeletePaper = async (paperId: string) => {
    try {
      const response = await fetch(`/api/papers/${paperId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete paper');
      }

      // Remove paper from state
      setPapers(prevPapers => prevPapers.filter(p => p._id !== paperId));
      toast.success('Paper deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete paper');
    }
  };

  const handleUpdatePaper = async (paperId: string, updates: Partial<ExtendedPaper>) => {
    try {
      setPapers(prev =>
        prev.map(p =>
          p.id === paperId
            ? {
                ...p,
                ...updates,
                version: (p.version || 0) + 1,
                lastModifiedAt: new Date(),
                lastModifiedBy: 'Current User'
              }
            : p
        )
      );
      toast.success('Paper updated successfully');
    } catch (error) {
      console.error('Error updating paper:', error);
      toast.error('Failed to update paper');
    }
  };

  // Utility function for proper text capitalization
  const toTitleCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Function to format file size
  const formatFileSize = (bytes: number | undefined): string => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const filteredPapers = useMemo(() => {
    if (!papers) return [];
    
    return papers.filter(paper => {
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
  }, [papers, searchQuery, selectedPathway, selectedYear, selectedType, filterCriteria, showAdvancedFilters]);

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
                    <span className="relative truncate block max-w-full" title={paper?.moduleTitle ? toTitleCase(paper.moduleTitle) : 'N/A'}>
                      <span className="relative z-10 group-hover:text-blue-400 transition-colors duration-300">
                        {paper?.moduleTitle ? toTitleCase(paper.moduleTitle) : 'N/A'}
                      </span>
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
                  {paper?.fileSize ? formatFileSize(paper.fileSize) : 'N/A'}
                </span>
              </div>
            </div>

            {/* Pathway */}
            {paper?.pathway && (
              <div className="mb-4 h-[32px] flex items-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-800/50 rounded-lg w-full">
                  <span className="text-yellow-400 text-sm truncate block w-full" title={paper.pathway.split('(')[0]?.trim() ? toTitleCase(paper.pathway.split('(')[0].trim()) : 'N/A'}>
                    {paper.pathway.split('(')[0]?.trim() ? toTitleCase(paper.pathway.split('(')[0].trim()) : 'N/A'}
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
                onClick={() => handleDownload(paper)}
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
                onClick={() => handleToggleVisibility(paper)}
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
                onClick={() => handleDeletePaper(paper._id)}
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
              <MagnifyingGlassIcon className="w-5 h-5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <Button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              variant="outline"
              className={cn(
                "gap-2",
                showAdvancedFilters && "bg-blue-500/10 text-blue-400 border-blue-500/50"
              )}
            >
              <FunnelIcon className="w-4 h-4" />
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
                {PATHWAYS.map(pathway => (
                  <option key={pathway} value={pathway}>{pathway}</option>
                ))}
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
                {PAPER_TYPES.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
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
                <XMarkIcon className="w-4 h-4 mr-2" />
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
            <PlusIcon className="w-4 h-4 mr-2" />
            Upload Papers
          </Button>
        )}
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-2 gap-6 p-6 max-w-[1600px] mx-auto">
        {filteredPapers.length === 0 ? (
          <div className="col-span-full">
            <BackgroundGradient className="flex flex-col items-center justify-center p-8 rounded-xl">
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
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Upload Paper
                </Button>
              )}
            </BackgroundGradient>
          </div>
        ) : (
          filteredPapers.map(paper => renderPaperCard(paper))
        )}
      </div>

      {/* Modals */}
      {showUploadModal && (
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}

      {showBatchUpload && (
        <UploadModal
          isOpen={showBatchUpload}
          onClose={() => setShowBatchUpload(false)}
          onUpload={handleBatchUpload}
        />
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
                  onChange={(e) => handleCreateShareableLink(selectedPaperForAction._id, Number(e.target.value))}
                >
                  <option value="1">24 Hours</option>
                  <option value="7">7 Days</option>
                  <option value="30">30 Days</option>
                  <option value="365">1 Year</option>
                </select>
              </div>
              
              {selectedPaperForAction.shareableLinks?.map(link => (
                <div key={link.id} className="flex items-center justify-between p-2 bg-neutral-800 rounded-lg">
                  <span className="text-sm truncate flex-1 mr-2">{link.url}</span>
                  <Button
                    onClick={() => navigator.clipboard.writeText(link.url)}
                    className="bg-neutral-700 hover:bg-neutral-600"
                  >
                    Copy
                  </Button>
                </div>
              ))}
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
                onClick={() => {
                  handleDeletePaper(selectedPaperForAction._id);
                  setShowDeleteConfirm(false);
                }}
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
