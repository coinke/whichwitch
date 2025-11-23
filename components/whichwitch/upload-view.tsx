"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { UserProfile } from "./app-container"
import { UploadCloud, CheckCircle2, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function UploadView({ user, isRemix = false }: { user: UserProfile; isRemix?: boolean }) {
  const [status, setStatus] = useState<"idle" | "uploading" | "success">("idle")
  const [file, setFile] = useState<File | null>(null)
  const [allowRemix, setAllowRemix] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [materialTags, setMaterialTags] = useState<string[]>([])
  const [currentMaterial, setCurrentMaterial] = useState("")

  const SUGGESTED_TAGS = ["Cyberpunk", "Minimalist", "Nature", "Abstract", "Surreal"]
  const SUGGESTED_MATERIALS = ["Digital", "Wood", "Clay", "Glass", "Metal"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("uploading")
    setTimeout(() => {
      setStatus("success")
    }, 2500)
  }

  const addTag = (val: string, list: string[], setList: any, currentSetter: any) => {
    if (val.trim() && !list.includes(val.trim())) {
      setList([...list, val.trim()])
      currentSetter("")
    }
  }

  const removeTag = (tagToRemove: string, list: string[], setList: any) => {
    setList(list.filter((tag) => tag !== tagToRemove))
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6"
      >
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{isRemix ? "Remix Uploaded!" : "Work Minted Successfully!"}</h2>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Your work has been recorded on the blockchain and added to the genealogy tree.
          </p>
        </div>
        {/* ... existing success UI ... */}
        <Button onClick={() => setStatus("idle")} className="w-full max-w-xs">
          Upload Another
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">{isRemix ? "Upload Remix" : "Upload Original Work"}</h2>
        <p className="text-muted-foreground text-sm">Register your creation to the genealogy tree.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            file ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept="image/*,video/*"
          />
          <label htmlFor="file-upload" className="cursor-pointer block">
            {file ? (
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="font-medium text-sm truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">Click to change</p>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 bg-muted text-muted-foreground rounded-full flex items-center justify-center mx-auto">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="font-medium text-sm">Click to upload Image/Video</p>
                <p className="text-xs text-muted-foreground">IPFS / Arweave storage</p>
              </div>
            )}
          </label>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="The Whispering Vase" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="story">The Story</Label>
            <Textarea
              id="story"
              placeholder="What inspired this piece? Share the origin..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Material</Label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background focus-within:ring-1 focus-within:ring-ring">
              {materialTags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded"
                >
                  {tag}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag, materialTags, setMaterialTags)} />
                </span>
              ))}
              <input
                className="flex-1 bg-transparent border-none outline-none text-sm min-w-[100px]"
                placeholder="Type and enter (e.g. Clay)"
                value={currentMaterial}
                onChange={(e) => setCurrentMaterial(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  (e.preventDefault(), addTag(currentMaterial, materialTags, setMaterialTags, setCurrentMaterial))
                }
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_MATERIALS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag, materialTags, setMaterialTags, setCurrentMaterial)}
                  className="text-[10px] px-2 py-1 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Inspiration Keywords</Label>
            <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background focus-within:ring-1 focus-within:ring-ring">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded"
                >
                  #{tag}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag, tags, setTags)} />
                </span>
              ))}
              <input
                className="flex-1 bg-transparent border-none outline-none text-sm min-w-[100px]"
                placeholder="Type and enter..."
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag(currentTag, tags, setTags, setCurrentTag))
                }
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag, tags, setTags, setCurrentTag)}
                  className="text-[10px] px-2 py-1 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
                >
                  # {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/20">
            <div className="space-y-0.5">
              <Label className="text-base">Allow Remixing</Label>
              <p className="text-xs text-muted-foreground">Allow others to create derivative works</p>
            </div>
            <Switch checked={allowRemix} onCheckedChange={setAllowRemix} />
          </div>

          {allowRemix && (
            <div className="space-y-2 animate-in slide-in-from-top-2">
              <Label>Licensing Fee (ETH)</Label>
              <Input type="number" step="0.01" placeholder="0.05" />
            </div>
          )}
        </div>

        <Button type="submit" className="w-full h-12 text-lg" disabled={!file || status === "uploading"}>
          {status === "uploading" ? "Minting..." : isRemix ? "Mint Remix" : "Mint to Chain"}
        </Button>
      </form>
    </div>
  )
}
