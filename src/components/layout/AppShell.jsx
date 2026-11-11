import React, { useState } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Toast } from '../common/Toast'
import { ProfileModal } from '../../pages/auth/ProfileModal'
import { ChangePasswordModal } from '../../pages/auth/ChangePasswordModal'
import { ForgotPasswordModal } from '../../pages/auth/ForgotPasswordModal'

export function AppShell({
  activeModule,
  setActiveModule,
  dark,
  setDark,
  currentUser,
  onChangeRole,
  onUpdateUser,
  onLogout,
  onViewLanding,
  toast,
  setToast,
  onNotify,
  children
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isPasswordOpen, setIsPasswordOpen] = useState(false)
  const [isForgotOpen, setIsForgotOpen] = useState(false)

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-[#F6F8F4] text-slate-800 transition-colors duration-200 dark:bg-[#111710] dark:text-slate-100">
        {/* Sidebar */}
        <Sidebar
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          currentUser={currentUser}
          onOpenProfile={() => setIsProfileOpen(true)}
          onLogout={onLogout}
        />

        {/* Main Content Area */}
        <main className="min-h-screen lg:pl-[265px] flex flex-col">
          <Header
            activeModule={activeModule}
            onOpenSidebar={() => setSidebarOpen(true)}
            dark={dark}
            setDark={setDark}
            currentUser={currentUser}
            onChangeRole={onChangeRole}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenPasswordModal={() => setIsPasswordOpen(true)}
            onLogout={onLogout}
            onNavigate={(mod) => setActiveModule(mod)}
            onViewLanding={onViewLanding}
          />

          <div className="flex-1 p-4 sm:p-7 max-w-[1600px] w-full mx-auto">
            {children}
          </div>
        </main>

        {/* User Profile Modal */}
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={currentUser}
          onUpdateUser={onUpdateUser}
          onNotify={onNotify}
        />

        {/* Change Password Modal */}
        <ChangePasswordModal
          isOpen={isPasswordOpen}
          onClose={() => setIsPasswordOpen(false)}
          onNotify={onNotify}
        />

        {/* Forgot Password Modal */}
        <ForgotPasswordModal
          isOpen={isForgotOpen}
          onClose={() => setIsForgotOpen(false)}
          onNotify={onNotify}
        />

        {/* Toast Notification */}
        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    </div>
  )
}
