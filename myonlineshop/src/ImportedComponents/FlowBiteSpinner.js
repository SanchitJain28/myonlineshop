import { Spinner } from "flowbite-react";

export default function FLowBiteSpinner() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>
  );
}