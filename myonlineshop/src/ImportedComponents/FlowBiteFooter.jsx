import { Footer } from "flowbite-react";

export default function FlowBiteFooter() {
  return (
    <Footer container className="bg-black rounded-none">
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <p className="text-xl text-white">Instacart</p>
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="InstaCart™" year={2022} />
      </div>
    </Footer>
  );
}
