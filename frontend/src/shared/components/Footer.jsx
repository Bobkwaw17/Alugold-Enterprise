
export default function Footer() {

  return (
    <footer className="flex w-screen min-h-10 bg-(--inverse-surface) text-(--surface)">
      <div className="max-w-7xl w-full p-6 mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">

        <div className="flex flex-col gap-4 ">
          <h3 className="text-2xl font-semibold">ALUGOLD</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quidem quod voluptatibus aliquid minima nisi id impedit doloremque facilis aspernatur. Corporis laboriosam officiis magnam, nisi culpa impedit doloremque quod tenetur.</p>
          <div className="flex w-full gap-2 h-10">
            <div className="h-full aspect-square bg-green-200 rounded-md"></div>
            <div className="h-full aspect-square bg-green-200 rounded-md"></div>
          </div>
        </div>

        <div className="flex flex-col gap-1 ">
          <h4 className="font-semibold ">Services</h4>
          <ul className="flex flex-col">
            <li>Service 1</li>
            <li>Service 1</li>
            <li>Service 1</li>
            <li>Service 1</li>
            <li>Service 1</li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 ">
          <h4 className="font-semibold ">Services</h4>
          <ul className="flex flex-col">
            <li>Service 1</li>
            <li>Service 1</li>
            <li>Service 1</li>
            <li>Service 1</li>
            <li>Service 1</li>
          </ul>
        </div>

        <div className="flex flex-col gap-1 ">
          <h4 className="font-semibold ">Services</h4>
          <ul className="flex flex-col">
            <li>Service 1</li>
            <li>Service 1</li>
            <li>Service 1</li>
            <li>Service 1</li>
            <li>Service 1</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}