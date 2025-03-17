import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, X, Upload, FileText, ImageIcon, File, AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AppHeader } from "@/components/AppHeader"

export default function CreateReportPage() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAddTag = (e) => {
    e.preventDefault()
    if (!currentTag.trim()) return

    if (!tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
    }

    setCurrentTag("")
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleRemoveFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("Please provide a title for your report")
      return
    }

    if (!description.trim()) {
      setError("Please provide a description of your report")
      return
    }

    if (tags.length === 0) {
      setError("Please add at least one tag to categorize your report")
      return
    }

    if (files.length === 0) {
      setError("Please upload at least one evidence file")
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // In a real app, you would submit to your backend here
      navigate("/browse")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/browse" className="text-amber-600 hover:underline flex items-center">
            ← Back to reports
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create New Report</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  All reports are submitted anonymously. Do not include any personally identifiable information in your
                  report.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="title">Report Title</Label>
                <Input
                  id="title"
                  placeholder="Provide a clear, descriptive title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail. You can use markdown formatting."
                  className="min-h-[200px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-xs text-slate-500">
                  Include relevant details such as dates, locations, individuals involved, and the nature of the
                  misconduct.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} className="flex items-center gap-1 bg-slate-200 text-slate-800 hover:bg-slate-200">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-slate-500 hover:text-slate-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g., Finance, Healthcare)"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag(e)
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Evidence Files</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-md p-6 text-center">
                  <input type="file" id="file-upload" multiple className="hidden" onChange={handleFileChange} />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="h-8 w-8 text-slate-400 mb-2" />
                      <p className="text-slate-700 font-medium">Drag and drop files here, or click to select files</p>
                      <p className="text-sm text-slate-500 mt-1">
                        Upload documents, images, videos, or audio files as evidence
                      </p>
                    </div>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <h3 className="font-medium">Uploaded Files</h3>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          {file.type.includes("image") ? (
                            <ImageIcon className="h-5 w-5 text-green-500 mr-3" />
                          ) : file.type.includes("pdf") || file.type.includes("document") ? (
                            <FileText className="h-5 w-5 text-blue-500 mr-3" />
                          ) : (
                            <File className="h-5 w-5 text-slate-500 mr-3" />
                          )}
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFile(file)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate("/browse")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-amber-500 hover:bg-amber-600" disabled={loading}>
                {loading ? "Submitting..." : "Submit Report"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}

