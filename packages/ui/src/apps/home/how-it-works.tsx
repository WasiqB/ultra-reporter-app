import type { JSX } from 'react';
import { Card, CardContent } from '../../components/card';
import { Description } from '../common/description';
import { Title } from '../common/title';

const steps = [
  {
    title: 'Upload TestNG XML File',
    description: 'Simply drag and drop your TestNG test results XML file or click to browse',
  },
  {
    title: 'Automatic Processing',
    description: 'Our system analyzes and processes your test data instantly',
  },
  {
    title: 'Generate Report',
    description: 'Get a beautiful, comprehensive report with visualizations and insights',
  },
];

export const HowItWorks = (): JSX.Element => (
  <section className='container mt-16 mb-16' id='how-it-works'>
    <div className='mx-auto mb-8 flex flex-col items-center space-y-4 text-center'>
      <Title text='How It Works?' />
      <Description
        text='Transform your TestNG test results into beautiful reports in three
          simple steps'
      />
    </div>
    <div className='mx-auto grid max-w-5xl gap-8 rounded-md pb-8 md:grid-cols-3'>
      {steps.map((step, index) => (
        <Card key={step.title}>
          <CardContent className='pt-6'>
            <div className='space-y-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground text-xl'>
                {index + 1}
              </div>
              <h3 className='font-bold text-xl'>{step.title}</h3>
              <p className='text-muted-foreground'>{step.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className='mx-auto max-w-5xl rounded-lg border bg-background p-8'>
      <div className='relative' style={{ paddingBottom: '56.25%', height: 0 }}>
        <iframe
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
          title='Ultra Reporter Demo Video'
          className='absolute top-0 left-0 h-full w-full rounded-lg'
          src='https://www.youtube.com/embed/l2pk7LAq50I'
        />
      </div>
    </div>
  </section>
);
