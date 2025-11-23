"use client"

import { useState } from "react"
import type { UserProfile } from "./app-container"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { WorkCard } from "./work-card"
import { works } from "@/lib/mock-data"
import { Settings, Share2, Wallet, ArrowUpRight } from "lucide-react"
import { WorkDetailDialog } from "./work-card"

export function ProfileView({ user }: { user: UserProfile }) {
  // In a real app, we'd filter works by user ID
  const myWorks = works.slice(0, 2)
  const myRemixes = works.slice(2, 4).map((w) => ({ ...w, isRemix: true }))

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted/50 to-muted/10 border border-border/50 p-6 md:p-8 md:px-6 md:py-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -mr-10 -mt-10" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
            {/* Left: User Info */}
            <div className="flex gap-6 items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl shadow-primary/20 border-4 border-background shrink-0">
                {user.name.charAt(0)}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-mono border border-primary/20">
                    DID: {user.did.slice(0, 12)}...
                  </span>
                </div>

                <p className="text-muted-foreground max-w-md text-sm">{user.bio}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-muted text-foreground rounded-full text-[10px] font-medium border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Balance & Actions */}
            <div className="w-full md:w-auto flex flex-col gap-3">
              <div className="flex items-center justify-between gap-6 bg-primary/5 rounded-xl p-4 min-w-[240px]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Balance</p>
                    <p className="text-xl font-mono font-bold">4.205 ETH</p>
                  </div>
                </div>
                <Button size="sm" className="gap-2 h-8">
                  <ArrowUpRight className="w-4 h-4" /> Withdraw
                </Button>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent h-8">
                  <Settings className="w-4 h-4" /> Settings
                </Button>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent h-8">
                  <Share2 className="w-4 h-4" /> Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Works Tabs */}
      <Tabs defaultValue="originals" className="w-full">
        <TabsList className="w-full md:w-auto grid grid-cols-2 md:inline-flex">
          <TabsTrigger value="originals">Originals</TabsTrigger>
          <TabsTrigger value="remixes">Remixes</TabsTrigger>
        </TabsList>

        <TabsContent value="originals" className="space-y-4 mt-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {myWorks.map((work) => (
              <WorkDetailTrigger key={work.id} work={work} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="remixes" className="space-y-4 mt-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {myRemixes.map((work) => (
              <WorkDetailTrigger key={work.id} work={work} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function WorkDetailTrigger({ work }: { work: any }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        <WorkCard work={work} />
      </div>
      <WorkDetailDialog work={work} open={open} onOpenChange={setOpen} />
    </>
  )
}
