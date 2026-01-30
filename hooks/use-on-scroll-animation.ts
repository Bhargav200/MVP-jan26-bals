import { useEffect, RefObject } from "react"

export function useOnScrollAnimation(
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit = { threshold: 0.1 },
  className = "animate-fade-in-up",
  selector = ".animate-on-scroll"
) {
  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className)
          // We don't unobserve here to allow re-animation if needed, 
          // or we can unobserve if we want it to happen only once.
          // The original code didn't unobserve individual elements, just disconnected on unmount.
        }
      })
    }, options)

    const elements = ref.current.querySelectorAll(selector)
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [ref, className, selector]) // Intentionally omitting options to avoid object dependency issues
}
