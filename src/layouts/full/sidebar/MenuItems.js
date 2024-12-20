import {
  IconAperture,
  IconBeach,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconNotes,
  IconSquareRoundedPlus,
  IconTypography,
  IconUserPlus,
  IconBuildingSkyscraper,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  // {
  //   navlabel: true,
  //   subheader: 'Utilities',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Typography',
  //   icon: IconTypography,
  //   href: '/ui/typography',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Shadow',
  //   icon: IconCopy,
  //   href: '/ui/shadow',
  // },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  // {
  //   navlabel: true,
  //   subheader: 'Extra',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Icons',
  //   icon: IconMoodHappy,
  //   href: '/icons',
  // },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
  {
    id: uniqueId(),
    title: 'Requested Quotes',
    icon: IconNotes,
    href: '/quotes',
  },
  {
    id: uniqueId(),
    title: 'Places',
    icon: IconBeach,
    href: '/places',
  },
  {
    id: uniqueId(),
    title: 'Add Place',
    icon: IconSquareRoundedPlus,
    href: '/places/add',
  },
  {
    id: uniqueId(),
    title: 'Hotels',
    icon: IconBuildingSkyscraper,
    href: '/hotels',
  },
  {
    id: uniqueId(),
    title: 'Add Hotel',
    icon: IconSquareRoundedPlus,
    href: '/hotels/add',
  },
  // users
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconUserPlus,
    href: '/users',
  },
];

export default Menuitems;
