import React, { useState } from 'react'
import { AppShell } from './components/layout/AppShell'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordModal } from './pages/auth/ForgotPasswordModal'
import { UserManagementPage } from './pages/auth/UserManagementPage'
import { DashboardPage } from './pages/dashboard/DashboardPage'
import { RegistrationManagementPage } from './pages/registration/RegistrationManagementPage'
import { MultiStepRegistrationModal } from './pages/registration/MultiStepRegistrationModal'
import { VerificationSelectionPage } from './pages/verification/VerificationSelectionPage'
import { FinancePage } from './pages/finance/FinancePage'
import { ExamManagementPage } from './pages/exam/ExamManagementPage'
import { DormitoryPage } from './pages/dormitory/DormitoryPage'
import { ReportsPage } from './pages/reports/ReportsPage'
import { MasterDataPage } from './pages/master/MasterDataPage'
import { NotificationGatewayPage } from './pages/notifications/NotificationGatewayPage'
import { HelpdeskPage } from './pages/helpdesk/HelpdeskPage'
import { ApplicantPortalPage } from './pages/applicant/ApplicantPortalPage'

import { mockApplicants } from './data/mockApplicants'
import { mockUsers, mockRoles } from './data/mockUsers'

export default function App() {
  const [authView, setAuthView] = useState('app') // 'app' | 'login' | 'register'
  const [activeModule, setActiveModule] = useState('Dashboard')
  const [dark, setDark] = useState(false)
  const [toast, setToast] = useState(null)
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  // Current session user (default is Super Admin for full prototype review)
  const [currentUser, setCurrentUser] = useState(mockUsers[0])
  const [users, setUsers] = useState(mockUsers)
  const [prefillLoginEmail, setPrefillLoginEmail] = useState('')

  // Centralized applicants state
  const [applicants, setApplicants] = useState(mockApplicants)

  const notify = (message, type = 'success') => {
    setToast({ message, type })
    window.setTimeout(() => setToast(null), 3200)
  }

  const handleAddApplicant = (newApplicant) => {
    setApplicants([newApplicant, ...applicants])
    notify(`Calon santri baru ${newApplicant.name} berhasil ditambahkan!`)
  }

  const handleUpdateApplicant = (updatedApplicant) => {
    const updated = applicants.map((a) =>
      a.id === updatedApplicant.id ? updatedApplicant : a
    )
    setApplicants(updated)
  }

  const handleResetPasswordSuccess = (targetEmail, newPassword) => {
    const updated = users.map((u) => {
      if (
        u.email.toLowerCase() === targetEmail.toLowerCase() ||
        (u.applicantId && u.applicantId.toLowerCase() === targetEmail.toLowerCase())
      ) {
        return { ...u, password: newPassword }
      }
      return u
    })
    setUsers(updated)
    setPrefillLoginEmail(targetEmail)
    notify(`Kata sandi untuk ${targetEmail} berhasil diperbarui! Silakan masuk dengan kata sandi baru.`)
  }

  const handleChangeRole = (roleId) => {
    const matchedRole = mockRoles.find((r) => r.id === roleId)
    const matchedUser = users.find((u) => u.roleId === roleId)

    if (matchedUser) {
      setCurrentUser(matchedUser)
    } else {
      setCurrentUser({
        ...currentUser,
        roleId: roleId,
        roleName: matchedRole ? matchedRole.name : 'Pengguna'
      })
    }

    notify(`Beralih simulasi wewenang sebagai: ${matchedRole ? matchedRole.name : roleId}`)
  }

  const handleLogout = () => {
    setAuthView('login')
    notify('Anda telah keluar dari sesi. Silakan masuk kembali.')
  }

  const handleLoginSuccess = (user) => {
    setCurrentUser(user)
    setAuthView('app')

    // Atur landing page yang berbeda dan sesuai dengan peran masing-masing
    if (user.roleId === 'applicant') {
      setActiveModule('Portal Santri')
    } else if (user.roleId === 'treasurer') {
      setActiveModule('Keuangan & Pembayaran')
    } else if (user.roleId === 'examiner') {
      setActiveModule('Tes & Ujian Online')
    } else if (user.roleId === 'verifier') {
      setActiveModule('Verifikasi & Seleksi')
    } else if (user.roleId === 'executive') {
      setActiveModule('Pelaporan & Pimpinan')
    } else {
      setActiveModule('Dashboard')
    }

    notify(`Selamat datang, ${user.name}! Masuk sebagai ${user.roleName}.`)
  }

  const handleRegisterSuccess = (newApplicant) => {
    handleAddApplicant(newApplicant)
    const newUser = {
      id: newApplicant.id,
      applicantId: newApplicant.id,
      name: newApplicant.name,
      email: newApplicant.email,
      password: newApplicant.password, // Password tersimpan untuk calon santri
      roleId: 'applicant',
      roleName: 'Calon Santri / Wali Santri',
      avatarInitials: newApplicant.avatarInitials || 'CS'
    }
    setUsers([newUser, ...users])
    setCurrentUser(newUser)
    setAuthView('app')
    setActiveModule('Portal Santri')
    notify(`Registrasi berhasil! Nomor pendaftaran Anda: ${newApplicant.id}`)
  }

  // If in Login view
  if (authView === 'login') {
    return (
      <div className={dark ? 'dark' : ''}>
        <LoginPage
          users={users}
          prefillEmail={prefillLoginEmail}
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={() => setAuthView('register')}
          onForgotPassword={() => setIsForgotPasswordOpen(true)}
        />
        <ForgotPasswordModal
          isOpen={isForgotPasswordOpen}
          onClose={() => setIsForgotPasswordOpen(false)}
          users={users}
          onResetPasswordSuccess={handleResetPasswordSuccess}
          onPrefillLoginEmail={(email) => setPrefillLoginEmail(email)}
          onNotify={notify}
        />
      </div>
    )
  }

  // If in Register view
  if (authView === 'register') {
    return (
      <div className={dark ? 'dark' : ''}>
        <RegisterPage
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={() => setAuthView('login')}
        />
      </div>
    )
  }

  // Main Application Shell
  return (
    <AppShell
      activeModule={activeModule}
      setActiveModule={setActiveModule}
      dark={dark}
      setDark={setDark}
      currentUser={currentUser}
      onChangeRole={handleChangeRole}
      onUpdateUser={setCurrentUser}
      onLogout={handleLogout}
      toast={toast}
      setToast={setToast}
      onNotify={notify}
    >
      {/* 1. Halaman Khusus Calon Santri (Portal Santri) */}
      {(activeModule === 'Portal Santri' ||
        activeModule === 'Dokumen Berkas' ||
        activeModule === 'Tagihan & Pembayaran' ||
        activeModule === 'Ujian CBT Online' ||
        activeModule === 'Asrama & Kamar' ||
        (activeModule === 'Dashboard' && currentUser?.roleId === 'applicant')) && (
        <ApplicantPortalPage
          applicant={applicants.find((a) => a.id === currentUser?.applicantId) || applicants[0]}
          activeTab={
            activeModule === 'Dokumen Berkas'
              ? 'documents'
              : activeModule === 'Tagihan & Pembayaran'
              ? 'payment'
              : activeModule === 'Ujian CBT Online'
              ? 'exam'
              : activeModule === 'Asrama & Kamar'
              ? 'dorm'
              : 'overview'
          }
          onTabChange={(tab) => {
            const tabModuleMap = {
              overview: 'Portal Santri',
              documents: 'Dokumen Berkas',
              payment: 'Tagihan & Pembayaran',
              exam: 'Ujian CBT Online',
              dorm: 'Asrama & Kamar'
            }
            setActiveModule(tabModuleMap[tab] || 'Portal Santri')
          }}
          onNavigate={(mod) => setActiveModule(mod)}
          onNotify={notify}
        />
      )}

      {/* 2. Halaman Dashboard Admin PPDB */}
      {activeModule === 'Dashboard' && currentUser?.roleId !== 'applicant' && (
        <DashboardPage
          applicants={applicants}
          onNavigate={(mod) => setActiveModule(mod)}
          onNotify={notify}
          onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
        />
      )}

      {activeModule === 'Pendaftaran Santri' && (
        <RegistrationManagementPage
          applicants={applicants}
          onAddApplicant={handleAddApplicant}
          onNotify={notify}
        />
      )}

      {activeModule === 'Verifikasi & Seleksi' && (
        <VerificationSelectionPage
          applicants={applicants}
          onUpdateApplicant={handleUpdateApplicant}
          onNotify={notify}
        />
      )}

      {activeModule === 'Keuangan & Pembayaran' && (
        <FinancePage onNotify={notify} />
      )}

      {activeModule === 'Tes & Ujian Online' && (
        <ExamManagementPage
          applicants={applicants}
          onUpdateApplicant={handleUpdateApplicant}
          onNotify={notify}
        />
      )}

      {activeModule === 'Asrama & Ke-santrian' && (
        <DormitoryPage
          applicants={applicants}
          onUpdateApplicant={handleUpdateApplicant}
          onNotify={notify}
        />
      )}

      {activeModule === 'Pelaporan & Pimpinan' && (
        <ReportsPage
          applicants={applicants}
          onNotify={notify}
        />
      )}

      {activeModule === 'Master Data & Pengaturan' && (
        <MasterDataPage onNotify={notify} />
      )}

      {activeModule === 'Notifikasi Gateway' && (
        <NotificationGatewayPage onNotify={notify} />
      )}

      {activeModule === 'Helpdesk & FAQ' && (
        <HelpdeskPage onNotify={notify} />
      )}

      {activeModule === 'Manajemen Akun & Role' && (
        <UserManagementPage onNotify={notify} />
      )}

      {/* Global Multi-step Registration Modal */}
      <MultiStepRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSubmitSuccess={handleAddApplicant}
        onNotify={notify}
      />
    </AppShell>
  )
}
