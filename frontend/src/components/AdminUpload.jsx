import { useParams, NavLink } from 'react-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import axiosClient from '../utils/axiosClient';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, UploadCloud, Video, AlertTriangle, FileCode, CheckCircle } from 'lucide-react';

function AdminUpload() {
  const { problemId } = useParams();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError,
    clearErrors
  } = useForm();

  const selectedFile = watch('videoFile')?.[0];

  // Upload video to Cloudinary
  const onSubmit = async (data) => {
    const file = data.videoFile[0];
    
    setUploading(true);
    setUploadProgress(0);
    clearErrors();

    try {
      // Step 1: Get upload signature from backend
      const signatureResponse = await axiosClient.get(`/video/create/${problemId}`);
      const { signature, timestamp, public_id, api_key, cloud_name, upload_url } = signatureResponse.data;

      // Step 2: Create FormData for Cloudinary upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('public_id', public_id);
      formData.append('api_key', api_key);

      // Step 3: Upload directly to Cloudinary
      const uploadResponse = await axios.post(upload_url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      const cloudinaryResult = uploadResponse.data;

      // Step 4: Save video metadata to backend
      const metadataResponse = await axiosClient.post('/video/save', {
        problemId: problemId,
        cloudinaryPublicId: cloudinaryResult.public_id,
        secureUrl: cloudinaryResult.secure_url,
        duration: cloudinaryResult.duration,
      });

      setUploadedVideo(metadataResponse.data.videoSolution);
      reset(); // Reset form after successful upload
      
    } catch (err) {
      console.error('Upload error:', err);
      setError('root', {
        type: 'manual',
        message: err.response?.data?.message || 'Upload execution failed. Please verify file formatting.'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pb-12">
      {/* Top Navbar */}
      <nav className="navbar border-b border-slate-800 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-50 px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <NavLink to="/admin/video">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <ArrowLeft size={16} />
            </Button>
          </NavLink>
          <span className="text-sm font-semibold text-slate-300">Back to Manager</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-white select-none">
            Apex<span className="text-indigo-500">Code</span>
          </span>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container mx-auto px-4 py-8 max-w-md space-y-6 animate-in fade-in duration-200">
        
        <div className="border-b border-slate-850 pb-4">
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <UploadCloud size={22} className="text-indigo-400" /> Upload Editorial Media
          </h1>
          <p className="text-xs text-slate-400 mt-1">Upload video guides directly to server media directories.</p>
        </div>

        <Card className="border-slate-800 bg-[#090d16]/40 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* File dropzone representation */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Select Video File
              </label>
              
              <div className="relative group border border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-6 bg-[#080c14]/40 text-center transition-colors flex flex-col items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  {...register('videoFile', {
                    required: 'Please select a video file',
                    validate: {
                      isVideo: (files) => {
                        if (!files || !files[0]) return 'Please select a video file';
                        const file = files[0];
                        return file.type.startsWith('video/') || 'Please select a valid video file';
                      },
                      fileSize: (files) => {
                        if (!files || !files[0]) return true;
                        const file = files[0];
                        const maxSize = 100 * 1024 * 1024; // 100MB
                        return file.size <= maxSize || 'File size must be less than 100MB';
                      }
                    }
                  })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={uploading}
                />
                
                <Video size={36} className="text-slate-600 group-hover:text-indigo-400 transition-colors mb-3" />
                <span className="text-xs font-bold text-slate-300 block">Click to select MP4 / WebM</span>
                <span className="text-[10px] text-slate-500 mt-1 block">Maximum size upload: 100MB</span>
              </div>

              {errors.videoFile && (
                <p className="text-red-400 text-xs mt-1">{errors.videoFile.message}</p>
              )}
            </div>

            {/* Selected File Stats */}
            {selectedFile && !uploading && (
              <div className="p-3 rounded-lg border border-slate-850 bg-[#080c14]/60 flex items-center gap-3 text-xs">
                <FileCode size={18} className="text-indigo-400" />
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-slate-200 block truncate">{selectedFile.name}</span>
                  <span className="text-[10px] text-slate-500 block">{formatFileSize(selectedFile.size)}</span>
                </div>
              </div>
            )}

            {/* Progress Loaders */}
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-indigo-400 font-bold">Uploading video solution...</span>
                  <span className="text-slate-300">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* General Errors */}
            {errors.root && (
              <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs flex items-center gap-2">
                <AlertTriangle size={14} className="shrink-0" />
                <span>{errors.root.message}</span>
              </div>
            )}

            {/* Upload Successful Indicator */}
            {uploadedVideo && (
              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs flex flex-col gap-1">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle size={14} />
                  <span>Upload Successful!</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Duration: {formatDuration(uploadedVideo.duration)} minutes</span>
              </div>
            )}

            {/* Upload Trigger Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 font-semibold"
              disabled={uploading || !selectedFile}
            >
              {uploading ? 'Processing cloud storage...' : 'Upload Video'}
            </Button>

          </form>
        </Card>

      </div>
    </div>
  );
}

export default AdminUpload;