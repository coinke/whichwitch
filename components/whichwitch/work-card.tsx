"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Bookmark,
  GitFork,
  Share2,
  Coins,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Clock,
  Folder,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

export function WorkCard({
  work,
  isRemixable = false,
  allowTip = false,
  status,
  onRemix,
  onClick,
  showSavedDate = false,
  onUnsave,
}: {
  work: any
  isRemixable?: boolean
  allowTip?: boolean
  status?: "pending" | "approved" | "rejected" | "none"
  onRemix?: () => void
  onClick?: () => void
  showSavedDate?: boolean
  onUnsave?: () => void
}) {
  const [liked, setLiked] = useState(false)
  const [showCollectModal, setShowCollectModal] = useState(false)
  const [showTipModal, setShowTipModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const handleCardClick = (e: any) => {
    // Prevent click when clicking buttons
    if (e.target.closest("button")) return
    if (onClick) {
      onClick()
    } else {
      setShowDetailsModal(true)
    }
  }

  return (
    <>
      <Card
        onClick={handleCardClick}
        className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(var(--primary),0.3)] cursor-pointer"
      >
        {/* Image Container */}
        <div className="aspect-square relative overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

          <img
            src={work.image || "/placeholder.svg"}
            alt={work.title}
            className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
          />

          {/* Overlay Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 flex justify-between items-center">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10"
              onClick={() => setShowDetailsModal(true)}
            >
              View Details
            </Button>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20 rounded-full">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {onUnsave && (
            <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="destructive"
                className="h-8 w-8 rounded-full shadow-lg"
                onClick={(e) => {
                  e.stopPropagation()
                  onUnsave()
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="absolute top-3 right-3 flex flex-col gap-2 z-20 items-end pointer-events-none">
            {work.isRemix && (
              <Badge
                variant="secondary"
                className="bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-lg"
              >
                <GitFork className="w-3 h-3 mr-1 text-primary" /> Remix
              </Badge>
            )}
            {status === "pending" && (
              <Badge className="bg-yellow-500/80 backdrop-blur-md text-white border-none">Under Review</Badge>
            )}
            {status === "approved" && (
              <Badge className="bg-green-500/80 backdrop-blur-md text-white border-none">Approved</Badge>
            )}
            {status === "rejected" && (
              <Badge className="bg-red-500/80 backdrop-blur-md text-white border-none">Rejected</Badge>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-4 relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                {work.title}
              </h3>
              <p className="text-xs font-mono text-muted-foreground mt-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary/50" />
                {work.author}
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {work.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded bg-primary/5 border border-primary/10 text-primary/70 font-mono"
              >
                #{tag}
              </span>
            ))}
          </div>

          {showSavedDate && work.savedAt && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground pt-1">
              <Clock className="w-3 h-3" />
              Saved: {work.savedAt}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border/40">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={`${liked ? "text-pink-500" : "text-muted-foreground hover:text-pink-500"} px-2 h-8 transition-colors`}
                onClick={() => setLiked(!liked)}
              >
                <Heart className={`w-4 h-4 mr-1.5 ${liked ? "fill-current" : ""}`} />
                <span className="font-mono text-xs">{work.likes + (liked ? 1 : 0)}</span>
              </Button>
              {allowTip && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-yellow-500 px-2 h-8 transition-colors"
                  onClick={() => setShowTipModal(true)}
                >
                  <Coins className="w-4 h-4 mr-1.5" />
                  <span className="font-mono text-xs">Tip</span>
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              {isRemixable && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 bg-transparent border-primary/30 hover:border-primary/60 hover:bg-primary/5 text-primary"
                  onClick={onRemix}
                >
                  <GitFork className="w-3.5 h-3.5 mr-1.5" />
                  {status === "approved" ? "Upload" : status === "rejected" ? "Retry" : "Remix"}
                </Button>
              )}
              {!isRemixable && (
                <Button
                  size="sm"
                  variant="default"
                  className="h-8 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
                  onClick={() => setShowCollectModal(true)}
                >
                  <Bookmark className="w-3.5 h-3.5 mr-1.5 fill-current" />
                  Collect
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <CollectModal open={showCollectModal} onOpenChange={setShowCollectModal} workTitle={work.title} />
      <TipModal open={showTipModal} onOpenChange={setShowTipModal} workTitle={work.title} />
      <WorkDetailDialog work={work} open={showDetailsModal} onOpenChange={setShowDetailsModal} />
    </>
  )
}

function TipModal({ open, onOpenChange, workTitle }: any) {
  const [amount, setAmount] = useState("1")
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleTip = () => {
    // Simulate check balance (mock logic: error if amount > 50)
    if (amount === "0.1") {
      // Simulate insufficient balance for the largest amount
      setStatus("error")
    } else {
      setStatus("success")
      setTimeout(() => {
        onOpenChange(false)
        setStatus("idle")
      }, 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle>Tip Artist</DialogTitle>
          <DialogDescription>Send a tip to the creator of "{workTitle}".</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {status === "success" ? (
            <div className="text-center text-green-500 font-bold py-4">Tip sent successfully!</div>
          ) : status === "error" ? (
            <div className="space-y-2 text-center">
              <div className="text-red-500 font-bold">Transaction Failed</div>
              <p className="text-xs text-muted-foreground">Insufficient wallet balance.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Label>Select Amount (ETH)</Label>
              <RadioGroup defaultValue="0.01" onValueChange={setAmount} className="grid grid-cols-3 gap-2">
                {["0.01", "0.05", "0.1"].map((val) => (
                  <div key={val}>
                    <RadioGroupItem value={val} id={`tip-${val}`} className="peer sr-only" />
                    <Label
                      htmlFor={`tip-${val}`}
                      className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-xs font-mono"
                    >
                      {val}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
        {status === "error" ? (
          <Button onClick={() => setStatus("idle")} className="w-full">
            Try Again
          </Button>
        ) : (
          status !== "success" && (
            <DialogFooter>
              <Button onClick={handleTip} className="w-full">
                Send Tip
              </Button>
            </DialogFooter>
          )
        )}
      </DialogContent>
    </Dialog>
  )
}

function CollectModal({ open, onOpenChange, workTitle }: any) {
  const [folderName, setFolderName] = useState("")
  const [showNewFolder, setShowNewFolder] = useState(false)
  const [folders, setFolders] = useState(["Inspiration", "To Remix", "Favorites", "Research"])
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleAddFolder = () => {
    if (folderName.trim()) {
      setFolders([...folders, folderName.trim()])
      setSelectedFolder(folderName.trim())
      setFolderName("")
      setShowNewFolder(false)
    }
  }

  const handleSave = () => {
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onOpenChange(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle>Collect "{workTitle}"</DialogTitle>
          <DialogDescription>Save this work to your folders.</DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4">
              <Bookmark className="w-6 h-6 fill-current" />
            </div>
            <h3 className="font-bold text-lg">Added successfully</h3>
            <p className="text-muted-foreground text-sm">You can view this in your Saved tab.</p>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Folder</Label>
              <div className="grid grid-cols-2 gap-2">
                {folders.map((f) => (
                  <Button
                    key={f}
                    variant={selectedFolder === f ? "default" : "outline"}
                    className={cn(
                      "justify-start text-xs h-9",
                      selectedFolder === f
                        ? "bg-primary text-primary-foreground"
                        : "bg-transparent border-border/50 hover:border-primary/50 hover:bg-primary/5",
                    )}
                    onClick={() => setSelectedFolder(f)}
                  >
                    <Folder className="w-3 h-3 mr-2" />
                    {f}
                  </Button>
                ))}
                <Button
                  variant="dashed"
                  className="justify-start text-xs h-9 bg-transparent border-dashed border-border/50 hover:border-primary/50"
                  onClick={() => setShowNewFolder(true)}
                >
                  + New Folder
                </Button>
              </div>
            </div>
            {showNewFolder && (
              <div className="space-y-2 p-3 bg-muted/20 rounded-md border border-border/50 animate-in fade-in slide-in-from-top-2">
                <Label className="text-xs">New Folder Name</Label>
                <div className="flex gap-2">
                  <input
                    className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g. My Project"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                  />
                  <Button size="sm" onClick={handleAddFolder}>
                    Add
                  </Button>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label>Add Note</Label>
              <Textarea
                placeholder="I want to try recreating this pattern in wood..."
                className="text-xs bg-muted/50"
              />
            </div>
          </div>
        )}

        {!showSuccess && (
          <DialogFooter>
            <Button onClick={handleSave} className="w-full" disabled={!selectedFolder}>
              Save to Collection
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function WorkDetailDialog({ work, open, onOpenChange }: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeRemixer, setActiveRemixer] = useState(0)

  if (!work) return null

  const images = work.images || [work.image || "/placeholder.svg"]

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-[60vw] max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl">{work.title}</DialogTitle>
          <DialogDescription>Genealogy and Attribution</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="rounded-xl overflow-hidden border border-border/50 shadow-2xl relative aspect-video bg-black/50 group">
            <img src={images[currentImageIndex] || "/placeholder.svg"} className="w-full h-full object-contain" />

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i === currentImageIndex ? "bg-white" : "bg-white/30"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-primary">Story</h4>
                <p className="text-sm text-muted-foreground italic">"{work.story || "No story provided."}"</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-primary">Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-muted/30 p-2 rounded">
                    <span className="text-xs text-muted-foreground block">Material</span>
                    <span>{work.material || "N/A"}</span>
                  </div>
                  <div className="bg-muted/30 p-2 rounded">
                    <span className="text-xs text-muted-foreground block">Dimensions</span>
                    <span>Variable</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="font-mono text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-primary">
                  <GitFork className="w-4 h-4" /> Creation Genealogy
                </h4>
                {/* ... existing genealogy visualization ... */}
                <div className="p-4 bg-muted/20 rounded-xl border border-border/50 relative overflow-hidden h-full">
                  {/* Simplified Genealogy Tree Visual */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 opacity-50">
                      <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-[10px]">
                        Root
                      </div>
                      <div className="h-px bg-border flex-1" />
                    </div>
                    <div className="flex items-center gap-3 pl-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center font-bold text-xs">
                        You
                      </div>
                      <div className="text-xs font-bold">{work.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Remixed By ({work.remixCount || 0})</h4>
            </div>

            <div className="bg-muted/10 border border-border rounded-lg overflow-hidden">
              <div className="flex border-b border-border/50 overflow-x-auto">
                {(work.remixers || []).map((remixer: string, index: number) => (
                  <button
                    key={remixer}
                    onClick={() => setActiveRemixer(index)}
                    className={cn(
                      "px-4 py-2 text-xs font-medium transition-colors border-r border-border/50 hover:bg-muted/50 whitespace-nowrap",
                      activeRemixer === index
                        ? "bg-primary/10 text-primary border-b-2 border-b-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {remixer}
                  </button>
                ))}
              </div>

              <div className="p-4 flex gap-4 items-start">
                {(work.remixers || []).length > 0 ? (
                  <>
                    <div className="w-20 h-20 bg-muted rounded-md overflow-hidden shrink-0">
                      {/* Mock remix image based on index */}
                      <img
                        src={images[activeRemixer % images.length] || "/placeholder.svg"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold">Remix by {(work.remixers || [])[activeRemixer]}</p>
                      <p className="text-xs text-muted-foreground">
                        "An incredible reinterpretation using digital techniques..."
                      </p>
                      <Button size="sm" variant="link" className="h-auto p-0 text-primary text-xs">
                        View Full Project
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center w-full py-4 text-sm text-muted-foreground">No remixes yet.</div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-red-500/10 w-full justify-start"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Plagiarism / Copyright Infringement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
