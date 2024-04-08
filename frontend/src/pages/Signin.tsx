import { Auth } from "../components/Auth";
import { Quote } from "../components/SideQuote";

export function Signin() {
  return (
    <>
      <div className="h-screen grid -cols-1 lg:grid-cols-2">
        <Auth type="signin" />
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </>
  );
}
