import { IFrontOfficeSetting } from '@/types/frontend';
import { usePage } from '@inertiajs/react'


const Logo = () => {
  const { officeSettings } = usePage<{ officeSettings: IFrontOfficeSetting | null }>().props;
  return (
    <img
      src={officeSettings?.office_logo ?? ''}
      alt="ecommerce logo"
      className="h-10 md:h-12 w-[100px]"
    />
  )
}

export default Logo