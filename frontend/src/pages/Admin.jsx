import React from 'react';
import { Plus, Edit, Trash2, Video, ArrowLeft, ShieldAlert } from 'lucide-react';
import { NavLink } from 'react-router';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

function Admin() {
  const adminOptions = [
    {
      id: 'create',
      title: 'Create Problem',
      description: 'Add a new coding problem with test cases, templates, and reference solutions.',
      icon: Plus,
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/50',
      btnVariant: 'default',
      route: '/admin/create'
    },
    {
      id: 'update',
      title: 'Update Problem',
      description: 'Modify metadata, adjust code templates, or update editorial resources.',
      icon: Edit,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:border-amber-500/50',
      btnVariant: 'outline',
      route: '/admin/update'
    },
    {
      id: 'delete',
      title: 'Delete Problem',
      description: 'Permanently remove a coding challenge and its related sub-resources.',
      icon: Trash2,
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:border-rose-500/50',
      btnVariant: 'destructive',
      route: '/admin/delete'
    },
    {
      id: 'video',
      title: 'Video Solutions',
      description: 'Upload, replace, or remove video editorial media linked to coding tasks.',
      icon: Video,
      color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:border-indigo-500/50',
      btnVariant: 'outline',
      route: '/admin/video'
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 pb-12">
      {/* Navigation Header */}
      <nav className="navbar border-b border-slate-800 bg-[#090d16]/80 backdrop-blur-md sticky top-0 z-50 px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <NavLink to="/">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <ArrowLeft size={16} />
            </Button>
          </NavLink>
          <span className="text-sm font-semibold text-slate-300">Back to Portal</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-white select-none">
            Apex<span className="text-indigo-500">Code</span>
          </span>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8 animate-in fade-in duration-300">
        
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-850 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
              <ShieldAlert className="text-indigo-400" /> Admin Console
            </h1>
            <p className="text-sm text-slate-400">
              Manage challenges, reference files, and video media solutions.
            </p>
          </div>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card 
                key={option.id} 
                className="border-slate-800/80 bg-[#090d16]/40 hover:border-slate-700/80 transition-all duration-300 flex flex-col justify-between"
              >
                <CardHeader className="space-y-4">
                  {/* Icon Block */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${option.color} transition-colors`}>
                    <IconComponent size={20} />
                  </div>
                  <div className="space-y-1.5">
                    <CardTitle className="text-lg font-bold text-white">{option.title}</CardTitle>
                    <CardDescription className="text-slate-400 text-xs leading-relaxed">
                      {option.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-6 px-6">
                  <NavLink to={option.route} className="block w-full">
                    <Button 
                      variant={option.btnVariant === 'destructive' ? 'destructive' : 'outline'} 
                      className="w-full text-xs font-semibold"
                    >
                      Open {option.title}
                    </Button>
                  </NavLink>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Admin;