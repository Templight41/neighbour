export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-4 max-w-4xl">
      <div className="prose prose-sm max-w-none">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">About Our Service</h2>
            <p className="text-sm">
              Neighbour helps local artisans increase their online presence using the Pinterest API to showcase products and connect with customers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Information We Collect</h2>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Account information (email, name)</li>
              <li>Artisan profile and product details</li>
              <li>Images and content you share</li>
              <li>Usage data to improve service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Pinterest API Usage</h2>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>Create and manage Pinterest boards</li>
              <li>Share artisan products on Pinterest</li>
              <li>Track content engagement</li>
              <li>Connect artisans with customers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Data Protection</h2>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              <li>We do not sell or share personal information</li>
              <li>Data is stored securely with encryption</li>
              <li>Information used only for our services</li>
              <li>You can delete account and data anytime</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Contact</h2>
            <p className="text-sm">
              Questions? Contact us at <a href="mailto:privacy@neighbour.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@neighbour.com</a>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}