"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Eye, ThumbsUp, MessageSquare, LogOut, User, Shield, AlertTriangle, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AppHeader } from "@/components/AppHeader"

// Mock data for user and validated reports
import USER_REPORTS from "@/assets/mockdata/user_report.json"
import VALIDATED_REPORTS from "@/assets/mockdata/user_report_validated.json"

export default function ProfilePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("my-reports")

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    navigate("/")
  }

  const handleDeleteAccount = () => {
    // In a real app, you would handle account deletion here
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xl font-bold mr-4">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">anonymous_user</h2>
                    <p className="text-slate-500">Member since Nov 2023</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-slate-500 mr-2" />
                    <span>Security Level: High</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-5 w-5 text-slate-500 mr-2" />
                    <span>Reports: {USER_REPORTS.length}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-slate-500 mr-2" />
                    <span>Validations: {VALIDATED_REPORTS.length}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove all your
                          data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl">Security Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start mb-4">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                  <p className="text-sm text-slate-700">
                    For maximum security, we recommend accessing PAWS through the Tor network and using a secure,
                    non-personal device.
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  Security Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:w-3/4">
            <Tabs defaultValue="my-reports" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="my-reports">My Reports</TabsTrigger>
                <TabsTrigger value="validated">Validated Reports</TabsTrigger>
              </TabsList>

              <TabsContent value="my-reports">
                <h2 className="text-2xl font-bold mb-6">My Reports</h2>

                {USER_REPORTS.length > 0 ? (
                  <div className="space-y-6">
                    {USER_REPORTS.map((report) => (
                      <Link to={`/report/${report.id}`} key={report.id} className="block">
                        <Card className="transition-all hover:shadow-md">
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
                            <p className="text-slate-600 mb-4">{report.description}</p>
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
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-slate-500 text-lg mb-4">You haven't created any reports yet.</p>
                    <Button asChild className="bg-amber-500 hover:bg-amber-600">
                      <Link to="/create">Create Your First Report</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="validated">
                <h2 className="text-2xl font-bold mb-6">Reports You've Validated</h2>

                {VALIDATED_REPORTS.length > 0 ? (
                  <div className="space-y-6">
                    {VALIDATED_REPORTS.map((report) => (
                      <Link to={`/report/${report.id}`} key={report.id} className="block">
                        <Card className="transition-all hover:shadow-md">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-xl">{report.title}</CardTitle>
                              <Badge className="bg-green-500">Validated</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-slate-600 mb-4">{report.description}</p>
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
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-slate-500 text-lg mb-4">You haven't validated any reports yet.</p>
                    <Button asChild variant="outline">
                      <Link to="/browse">Browse Reports to Validate</Link>
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

