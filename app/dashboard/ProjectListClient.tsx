"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string | null
  status: string
  created_at: string
  updated_at: string
}

interface ProjectListClientProps {
  initialProjects: Project[]
}

export function ProjectListClient({ initialProjects }: ProjectListClientProps) {
  console.log('📦 ProjectListClient received:', initialProjects)

  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "draft",
    vision: "",
    target_audience: "",
  })

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create project')
      }

      const newProject = await response.json()
      setProjects([newProject, ...projects])
      setIsCreateModalOpen(false)
      setFormData({
        name: "",
        description: "",
        status: "draft",
        vision: "",
        target_audience: "",
      })

      // Navigate to the new project
      router.push(`/projects/${newProject.id}`)
    } catch (error) {
      console.error("Failed to create project:", error)
    } finally {
      setIsCreating(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Project Card */}
        <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-6">
          <h2 className="text-xl font-semibold mb-2">Create New Project</h2>
          <p className="text-zinc-400 mb-4">
            Start building something awesome
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-semibold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all"
          >
            + Create New Project
          </button>
        </div>

        {/* Projects List */}
        {projects.length > 0 ? (
          projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-6 hover:border-amber-500/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold group-hover:text-amber-400 transition-colors">
                  {project.name}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  project.status === 'completed' ? 'bg-green-900/50 text-green-300 border border-green-800' :
                  project.status === 'active' ? 'bg-blue-900/50 text-blue-300 border border-blue-800' :
                  'bg-zinc-800 text-zinc-300 border border-zinc-700'
                }`}>
                  {project.status}
                </span>
              </div>
              {project.description && (
                <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
              )}
              <div className="text-xs text-zinc-500">
                Created {formatDate(project.created_at)}
              </div>
            </Link>
          ))
        ) : (
          <div className="lg:col-span-2 bg-zinc-900/50 rounded-lg border border-zinc-800 p-6">
            <p className="text-zinc-400 text-center py-8">
              No projects yet. Create your first one to get started!
            </p>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-zinc-900 rounded-lg border border-zinc-800 w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h2 className="text-xl font-semibold">Create New Project</h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="My Awesome Project"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="What are you building?"
                />
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-zinc-300 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Vision */}
              <div>
                <label htmlFor="vision" className="block text-sm font-medium text-zinc-300 mb-1">
                  Vision
                </label>
                <textarea
                  id="vision"
                  name="vision"
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="What does success look like?"
                />
              </div>

              {/* Target Audience */}
              <div>
                <label htmlFor="target_audience" className="block text-sm font-medium text-zinc-300 mb-1">
                  Target Audience
                </label>
                <textarea
                  id="target_audience"
                  name="target_audience"
                  value={formData.target_audience}
                  onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="Who is this for?"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-zinc-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
