import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  BarChartIcon,
  CircleAlert,
  MousePointerClick,
  Table,
} from 'lucide-react';

const features = [
  {
    title: 'One Click',
    description: 'Generate your Test execution report in one click',
    icon: MousePointerClick,
  },
  {
    title: 'Test Visualization',
    description: 'Generate insightful charts and graphs from your data',
    icon: BarChartIcon,
  },
  {
    title: 'Detailed Results',
    description:
      'Dive deep into your test results with comprehensive details in the Table',
    icon: Table,
  },
  {
    title: 'View Attachments',
    description: 'View your tests attachments like Screenshots and Texts',
    icon: MagnifyingGlassIcon,
  },
  {
    title: 'View Exceptions',
    description: 'View your tests exceptions and Errors',
    icon: CircleAlert,
  },
];

export const Features = (): JSX.Element => {
  return (
    <section className='mb-16 mt-16'>
      <h2 className='mb-8 text-center text-3xl font-bold text-gray-800'>
        Features
      </h2>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        {features.map((feature, index) => (
          <div key={index} className='rounded-lg bg-white p-6 shadow-lg'>
            <feature.icon className='mb-4 h-12 w-12 text-gray-600' />
            <h3 className='mb-2 text-xl font-semibold text-gray-800'>
              {feature.title}
            </h3>
            <p className='text-gray-600'>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
