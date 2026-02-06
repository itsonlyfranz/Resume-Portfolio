"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Users, BookOpen, GitFork } from "lucide-react"
import useSWR from "swr"

interface GitHubUser {
  login: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  avatar_url: string
}

interface GitHubActivityProps {
  username?: string
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function GitHubActivity({ username }: GitHubActivityProps) {
  const githubUsername = username || process.env.NEXT_PUBLIC_GITHUB_USERNAME

  const { data: userData, error } = useSWR<GitHubUser>(
    githubUsername ? `https://api.github.com/users/${githubUsername}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  if (!githubUsername) {
    return null
  }

  if (error) {
    return (
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5 text-primary" />
            GitHub Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Unable to load GitHub stats at the moment.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!userData) {
    return (
      <Card className="border-primary/20 animate-pulse">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5 text-primary" />
            GitHub Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-24 bg-muted rounded-md" />
        </CardContent>
      </Card>
    )
  }

  const stats = [
    {
      icon: BookOpen,
      label: "Repositories",
      value: userData.public_repos,
    },
    {
      icon: Users,
      label: "Followers",
      value: userData.followers,
    },
    {
      icon: GitFork,
      label: "Following",
      value: userData.following,
    },
  ]

  return (
    <Card className="border-primary/20 hover:border-primary/40 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5 text-primary" />
          GitHub Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>

        <div className="pt-4 border-t">
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-2"
          >
            <Github className="h-4 w-4" />
            View GitHub Profile
          </a>
        </div>

        {userData.bio && (
          <p className="text-sm text-muted-foreground pt-2 border-t">
            {userData.bio}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
