import React from "react"
import { Card, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"

type StatsCardProps = {
  title: string
  value: number
  color?: string
}

export default function StatusCard({ title, value, color = "text-black" }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className={`text-2xl ${color}`}>{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}
