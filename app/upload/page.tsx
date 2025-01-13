import { FileUpload } from '@/components/FileUpload'

export default function UploadPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">Upload State Data</h1>
      <div className="max-w-md mx-auto">
        <FileUpload />
      </div>
    </div>
  )
}

