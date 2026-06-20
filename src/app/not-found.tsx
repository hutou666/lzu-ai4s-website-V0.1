import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-surface px-5 pt-16 text-center">
      <p className="text-8xl font-semibold text-brand-500/20">404</p>
      <h1 className="mt-4 text-xl font-semibold text-ink">页面未找到</h1>
      <p className="mt-2 text-sm text-ink-muted">您访问的页面不存在或已被移除</p>
      <div className="mt-8">
        <Button href="/" variant="dark" showArrow>
          返回首页
        </Button>
      </div>
    </div>
  );
}
