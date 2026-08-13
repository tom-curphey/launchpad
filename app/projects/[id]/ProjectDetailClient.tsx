"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EditProjectModal } from "./edit-project-modal"

interface Project {
  id: string
  name: string
  description: string | null
  status: string
  vision: string | null
  target_audience: string | null
  created_at: string
  updated_at: string
}

interface ProjectDetailClientProps {
  project: Project
  children: React.ReactNode
}

export function ProjectDetailClient({ project, children }: ProjectDetailClientProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const router = useRouter()

  const handleSaveProject = async (updatedData: Partial<Project>) => {
    const response = await fetch(`/api/projects/${project.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })

    if (!response.ok) {
      throw new Error('Failed to update project')
    }

    // Refresh the page to show updated data
    router.refresh()
  }

  return (
    <>
      {children}

      <EditProjectModal
        project={project}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProject}
      />

      {/* Edit button that triggers modal */}
      <button
        onClick={() => setIsEditModalOpen(true)}
        className="hidden"
        id="edit-project-button"
      >
        Edit Project
      </button>
    </>
  )
}
