import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-8 mt-8">
      <div className="grid auto-rows-min md:grid-cols-3 gap-4">
        <div>
          <h2 className="text-xl mb-4 mt-8 font-medium">Experiences</h2>
          <ul className="text-lg">
            <li>FLO EV Charging</li>
            <li>Shopify</li>
            <li>National Bank of Canada</li>
            <li>ALDO Shoes</li>
            <li>Frank & Oak</li>
            <li>Nurun</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl mb-4 mt-8 font-medium">Services</h2>
          <ul className="text-lg">
            <li>Design systems</li>
            <li>Prototyping</li>
            <li>UI/UX design</li>
            <li>UX tooling</li>
            <li>Product strategy</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl mb-4 mt-8 font-medium">Contact</h2>
          <ul className="text-lg">
            <li>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/emileaublet/"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link target="_blank" href="mailto:emileaublet@gmail.com">
                Email
              </Link>
            </li>
            <li>
              <Link target="_blank" href="/EmileAublet_2024_en.pdf">
                Resume (PDF)
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="my-12">
        © {new Date().getFullYear()} Émile Aublet. All rights reserved.
      </p>
    </footer>
  );
};
