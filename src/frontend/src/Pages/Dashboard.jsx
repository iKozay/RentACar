export default function Dashboard() {
    return (
      <div className="flex w-full h-full">
        <aside className="h-full bg-red-500 flex-shrink-0 w-1/4">
          {/* Content for the aside */}
          <p>Aside content</p>
        </aside>
        <main className="h-full bg-blue-500 flex-grow">
          {/* Content for the main */}
          <p>Main content</p>
        </main>
      </div>
    );
  }
  