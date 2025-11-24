"use client"

import { useState } from "react"
import { WorkCard } from "./work-card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GitFork, Wallet, Folder } from "lucide-react"
import { UploadView } from "./upload-view"
import type { UserProfile } from "./app-container"

export function CollectionsView({
  works,
  onUnsave,
  folders,
  onCreateFolder,
}: {
  works: any[]
  onUnsave: (id: number) => void
  folders: string[]
  onCreateFolder: (name: string) => void
}) {
  const [remixModalOpen, setRemixModalOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [newFolderModalOpen, setNewFolderModalOpen] = useState(false)
  const [selectedWork, setSelectedWork] = useState<any>(null)

  const collectedWorks = works.filter((w) => w.savedAt)

  // Group works by folder
  const worksByFolder: Record<string, any[]> = {}
  collectedWorks.forEach((w) => {
    const folder = w.savedFolder || "Unsorted"
    if (!worksByFolder[folder]) worksByFolder[folder] = []
    worksByFolder[folder].push(w)
  })

  // Ensure all folders exist in the view even if empty
  folders.forEach((f) => {
    if (!worksByFolder[f]) worksByFolder[f] = []
  })

  const handleRemixClick = (work: any) => {
    if (work.collectionStatus === "approved") {
      setUploadModalOpen(true)
    } else {
      setSelectedWork(work)
      setRemixModalOpen(true)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">My Collections</h2>
          <p className="text-muted-foreground text-sm">Works you've saved for inspiration or remixing.</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setNewFolderModalOpen(true)}>
          <Folder className="w-4 h-4" />
          New Folder
        </Button>
      </div>

      <div className="space-y-10">
        {Object.entries(worksByFolder).map(
          ([folder, folderWorks]) =>
            folderWorks.length > 0 && (
              <div key={folder} className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Folder className="w-4 h-4 text-primary" /> {folder}
                  <span className="text-xs text-muted-foreground font-normal ml-2">({folderWorks.length})</span>
                </h3>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {folderWorks.map((work) => (
                    <WorkCard
                      key={work.id}
                      work={work}
                      isRemixable={true}
                      status={work.collectionStatus as any}
                      onRemix={() => handleRemixClick(work)}
                      showSavedDate={true}
                      onUnsave={() => onUnsave(work.id)}
                    />
                  ))}
                </div>
              </div>
            ),
        )}
        {collectedWorks.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>No collections yet. Go to Square to discover and collect works!</p>
          </div>
        )}
      </div>

      {/* Remix Application Modal */}
      <Dialog open={remixModalOpen} onOpenChange={setRemixModalOpen}>
        <DialogContent className="max-w-sm sm:max-w-md bg-background/95 backdrop-blur-xl border-primary/20">
          <DialogHeader>
            <DialogTitle>Apply for Remix License</DialogTitle>
            <DialogDescription>Create a derivative work based on "{selectedWork?.title}".</DialogDescription>
          </DialogHeader>

          {selectedWork?.collectionStatus === "rejected" && (
            <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-md text-sm text-red-500">
              Previous application rejected: Insufficient balance. Please top up and try again.
            </div>
          )}

          <div className="space-y-6 py-4">
            {/* Existing header */}
            <div className="p-3 bg-muted/50 rounded-lg border border-border/50 flex items-center gap-3">
              <div className="w-12 h-12 bg-background rounded-md overflow-hidden border border-border">
                <img src={selectedWork?.image || "/placeholder.svg"} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-sm">{selectedWork?.title}</p>
                <p className="text-xs text-muted-foreground">Original by {selectedWork?.author}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Remix Type</Label>
              <Select defaultValue="reprocess">
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reprocess">Reprocess (New Material)</SelectItem>
                  <SelectItem value="remake">Remake (Visual Interpretation)</SelectItem>
                  <SelectItem value="mix">Mix (Combined with other works)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>License Fee</Label>
              <div className="flex items-center gap-2 p-3 border border-border rounded-lg bg-muted/20">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono">0.05 ETH</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => {
                // For now, we'll keep local state for the modal
                // Note: For a real app, setCollectedWorks/setStatus would need to update the parent state via a prop like onUpdateStatus
                setRemixModalOpen(false)
              }}
            >
              <GitFork className="w-4 h-4 mr-2" /> Pay & Mint License
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Folder Modal */}
      <NewFolderModal
        open={newFolderModalOpen}
        onOpenChange={setNewFolderModalOpen}
        onCreate={(name: string) => {
          onCreateFolder(name)
          setNewFolderModalOpen(false)
        }}
      />

      {/* Upload Modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-xl border-primary/20 max-h-[90vh] overflow-y-auto">
          <UploadView user={{ did: "mock", name: "User", bio: "", skills: [] } as UserProfile} isRemix={true} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

function NewFolderModal({ open, onOpenChange, onCreate }: any) {
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")

  const handleCreate = () => {
    if (name) {
      if (onCreate) onCreate(name)
      setName("")
      setDesc("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Folder Name</Label>
            <Input placeholder="e.g. Project Alpha" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="What's this collection for?"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate}>Create Folder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
