import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Clock,
  Eye,
  ThumbsUp,
  Download,
  Share2,
  Flag,
  FileText,
  ImageIcon,
  File,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import { AppHeader } from "@/components/AppHeader"

// Mock data for a specific report
import report from "@/assets/mockdata/reportdetails.json";

export default function ReportDetailPage() {
  const params = useParams()
  const reportId = 1
//   const reportId = params.id

  const [activeTab, setActiveTab] = useState("evidence")
  const [commentText, setCommentText] = useState("")
  const [upvoted, setUpvoted] = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(report.upvotes)

  const handleUpvote = () => {
    if (upvoted) {
      setUpvoteCount(upvoteCount - 1)
    } else {
      setUpvoteCount(upvoteCount + 1)
    }
    setUpvoted(!upvoted)
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return

    // In a real app, you would send this to your API
    alert("Comment submitted: " + commentText)
    setCommentText("")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/browse" className="text-amber-600 hover:underline flex items-center">
            ← Back to reports
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-slate-900">{report.title}</h1>
            {report.validated ? (
              <Badge className="bg-green-500">Validated by {report.validatedBy} validators</Badge>
            ) : (
              <Badge variant="outline" className="text-amber-500 border-amber-500">
                Pending Validation
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {report.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center text-sm text-slate-500 mb-6 gap-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Reported on {report.date}</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              <span>{report.views} views</span>
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            {report.description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className={upvoted ? "bg-amber-50 text-amber-600" : ""} onClick={handleUpvote}>
              <ThumbsUp className="h-4 w-4 mr-2" />
              Support ({upvoteCount})
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" className="text-red-600 hover:bg-red-50">
              <Flag className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </div>

        <Tabs defaultValue="evidence" className="mb-8" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="evidence">Evidence Files</TabsTrigger>
            <TabsTrigger value="discussion">Discussion ({report.comments.length})</TabsTrigger>
            <TabsTrigger value="validation">Validation Status</TabsTrigger>
          </TabsList>

          <TabsContent value="evidence" className="mt-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Evidence Files</h2>
              <div className="space-y-3">
                {report.files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50"
                  >
                    <div className="flex items-center">
                      {file.type === "document" ? (
                        <FileText className="h-5 w-5 text-blue-500 mr-3" />
                      ) : file.type === "image" ? (
                        <ImageIcon className="h-5 w-5 text-green-500 mr-3" />
                      ) : (
                        <File className="h-5 w-5 text-slate-500 mr-3" />
                      )}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-slate-500">{file.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="discussion" className="mt-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Discussion</h2>

              <div className="space-y-6 mb-8">
                {report.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarFallback className={comment.isValidator ? "bg-green-100 text-green-700" : "bg-slate-100"}>
                        {comment.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="font-medium mr-2">{comment.username}</span>
                        {comment.isValidator && (
                          <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                            Validator
                          </Badge>
                        )}
                        <span className="text-slate-500 text-sm ml-auto">{comment.date}</span>
                      </div>
                      <p className="text-slate-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment}>
                <h3 className="font-medium mb-2">Add your contribution</h3>
                <Textarea
                  placeholder="Share additional information or ask questions..."
                  className="mb-3"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
                  Post Comment
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="validation" className="mt-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Validation Status</h2>

              {report.validated ? (
                <div className="flex items-start p-4 bg-green-50 border border-green-200 rounded-md mb-6">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-green-800">Validated Report</h3>
                    <p className="text-green-700">
                      This report has been reviewed and validated by {report.validatedBy} independent validators who
                      have confirmed the authenticity of the evidence provided.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start p-4 bg-amber-50 border border-amber-200 rounded-md mb-6">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-800">Pending Validation</h3>
                    <p className="text-amber-700">
                      This report is currently under review by our validators. The evidence is being verified for
                      authenticity and relevance.
                    </p>
                  </div>
                </div>
              )}

              <h3 className="font-medium mb-3">Validation Process</h3>
              <ol className="list-decimal list-inside space-y-2 text-slate-700 mb-6">
                <li>Reports are submitted with supporting evidence</li>
                <li>A panel of independent validators reviews the evidence</li>
                <li>Validators verify the authenticity and relevance of the evidence</li>
                <li>At least 3 validators must approve for a report to be validated</li>
                <li>Validated reports are marked as such and gain higher visibility</li>
              </ol>

              <div className="bg-slate-50 p-4 rounded-md">
                <h3 className="font-medium mb-2">Become a Validator</h3>
                <p className="text-slate-700 mb-3">
                  If you have expertise in relevant fields and want to help validate whistleblower reports, consider
                  applying to become a validator.
                </p>
                <Button variant="outline">Apply to be a Validator</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

