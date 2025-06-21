import { IFrontOfficeSetting } from '@/types/frontend';
import { Link, usePage } from '@inertiajs/react'
import React from 'react'

const Logo = () => {
    const { officeSettings } = usePage<{ officeSettings: IFrontOfficeSetting | null }>().props;
  return (
    
     
          <img
            src={officeSettings?.office_logo ?? ''}
            alt="RMKV Wedding Silks"
            className="h-10 md:h-12 w-[100px]"
          />
       
    
  )
}

export default Logo