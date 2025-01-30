import { InfoBlock } from '@/components/shared/checkout/InfoBlock';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Доступ запрещён"
        text="Данную страницу могут просматривать только авторизованные пользователи"
        imageUrl="/assets/image/lock.png"
      />
    </div>
  );
}
