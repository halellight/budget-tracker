import { FileUpload } from '@/components/FileUpload'

export default function UploadPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">Upload State Data</h1>
      <FileUpload />
    </div>
  )
}

