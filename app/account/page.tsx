import { TopNavigationBar } from "@/components/top-navigation-bar"
import { BottomNavigationBar } from "@/components/bottom-navigation-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  ExternalLink,
  HelpCircle,
  Lock,
  LogOut,
  Settings,
  ShieldAlert,
  Ticket,
  User,
  ChevronRight,
} from "lucide-react"

export default function AccountPage() {
  return (
    <main className="flex min-h-screen flex-col pb-safe">
      <TopNavigationBar />

      <div className="flex-1 px-4 py-6 pb-20">
        <div className="mx-auto max-w-md">
          {/* Profile Section */}
          <div className="mb-6 flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-gray-500" />
            </div>
            <h1 className="text-xl font-bold">John Doe</h1>
            <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            <Button variant="outline" size="sm" className="mt-2">
              Edit Profile
            </Button>
          </div>

          {/* Account Stats */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <Ticket className="h-5 w-5 mx-auto mb-1" />
                <p className="text-xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Tickets</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <CreditCard className="h-5 w-5 mx-auto mb-1" />
                <p className="text-xl font-bold">2</p>
                <p className="text-xs text-muted-foreground">Payments</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <Settings className="h-5 w-5 mx-auto mb-1" />
                <p className="text-xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Settings</p>
              </CardContent>
            </Card>
          </div>

          {/* Account Settings */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Account Settings</h2>

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="#" className="flex items-center">
                    <div className="flex items-center">
                      <User className="mr-3 h-5 w-5 text-gray-500" />
                      <span>Personal Information</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="#" className="flex items-center">
                    <div className="flex items-center">
                      <CreditCard className="mr-3 h-5 w-5 text-gray-500" />
                      <span>Payment Methods</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="#" className="flex items-center">
                    <div className="flex items-center">
                      <Settings className="mr-3 h-5 w-5 text-gray-500" />
                      <span>Preferences</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </a>
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <div className="flex items-center">
                      <ShieldAlert className="mr-3 h-5 w-5 text-gray-500" />
                      <span>Privacy Policy</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <div className="flex items-center">
                      <Lock className="mr-3 h-5 w-5 text-gray-500" />
                      <span>Terms of Service</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                </Button>

                <Button variant="outline" className="w-full justify-between" asChild>
                  <a href="mailto:support@ticketapp.com" className="flex items-center">
                    <div className="flex items-center">
                      <HelpCircle className="mr-3 h-5 w-5 text-gray-500" />
                      <span>Contact Support</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Button variant="outline" className="w-full border-dashed">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>TicketApp v1.0.0</p>
            <p className="mt-1">© 2025 TicketApp. All rights reserved.</p>
          </div>
        </div>
      </div>

      <BottomNavigationBar activeTab="account" />
    </main>
  )
}

