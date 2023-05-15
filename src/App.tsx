import "@/style/reset.css";
import "@/style/tailwind.css";
import Style from "./style/override-antd.global.module.scss";
import useAddBodyClassnames from "@/hooks/useAddBodyClassnames";
import { Router } from "@/router/Router";
import { Bootstrap } from "@/router/Bootstrap";

function App() {
  useAddBodyClassnames([
    import.meta.env.VITE_TAILWIND_PREFIX_CLS,
    Style.overrideAntd,
  ]);
  return (
    <div className="App">
      <Bootstrap>
        <Router />
      </Bootstrap>
    </div>
  );
}

export default App;
