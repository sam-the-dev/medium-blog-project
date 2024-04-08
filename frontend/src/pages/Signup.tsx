import { Auth } from "../components/Auth";
import { Quote } from "../components/SideQuote";

export function Signup() {
  return (
    <>
      <div className="h-screen grid -cols-1 lg:grid-cols-2">
        <Auth type="signup" />
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </>
  );
}
