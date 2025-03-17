import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Clock, Eye, ThumbsUp, MessageSquare, Plus } from "lucide-react"
import { AppHeader } from "@/components/AppHeader"

// Mock data for reports
import MOCK_REPORTS from "@/assets/mockdata/reports.json" 

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter reports based on search query and active tab
  const filteredReports = MOCK_REPORTS.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab === "all") return matchesSearch
    if (activeTab === "validated") return matchesSearch && report.validated
    if (activeTab === "pending") return matchesSearch && !report.validated

    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Browse Reports</h1>
            <p className="text-slate-600 mt-1">Explore whistleblower reports and evidence</p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button asChild className="bg-amber-500 hover:bg-amber-600">
              <Link to="/create">
                <Plus className="h-4 w-4 mr-2" />
                New Report
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="validated">Validated</TabsTrigger>
            <TabsTrigger value="pending">Pending Validation</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <Link to={`/report/${report.id}`} key={report.id} className="block">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{report.title}</CardTitle>
                      {report.validated ? (
                        <Badge className="bg-green-500">Validated</Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4 line-clamp-3">{report.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {report.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-slate-500 flex justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{report.date}</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{report.views}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{report.upvotes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{report.comments}</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500 text-lg">No reports found matching your search criteria.</p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("")
                  setActiveTab("all")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

