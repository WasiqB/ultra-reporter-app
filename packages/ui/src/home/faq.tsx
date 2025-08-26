'use client';

import { useVariableValue } from '@ultra-reporter/feature-toggle/client';
import { JSX } from 'react';
import { Description } from '../common/description';
import { Title } from '../common/title';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/accordion';

interface FAQProps {
  faq: { question: string; answer: string }[];
}

export const FAQ = (): JSX.Element | null => {
  const faqObject = useVariableValue('faq', {
    faq: [],
  });
  const faq = JSON.parse(JSON.stringify(faqObject)) as FAQProps;
  if (faq.faq.length === 0) {
    return null;
  }
  return (
    <section
      id='faq'
      className='bg-background container space-y-6 py-8 md:py-12 lg:py-24 dark:bg-transparent'
    >
      <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
        <Title text='Frequently Asked Questions' />
        <Description text='Find answers to common questions about Ultra Reporter' />
      </div>
      <div className='mx-auto w-full max-w-[700px]'>
        <Accordion type='single' collapsible className='w-full'>
          {faq.faq.map(
            (item: { question: string; answer: string }, index: number) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
      </div>
    </section>
  );
};
