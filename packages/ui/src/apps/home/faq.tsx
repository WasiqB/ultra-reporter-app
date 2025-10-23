'use client';

import { useVariableValue } from '@ultra-reporter/feature-toggle/client';
import type { JSX } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/accordion';
import { Description } from '../common/description';
import { Title } from '../common/title';

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
    <section className='container space-y-6 bg-background py-8 md:py-12 lg:py-24 dark:bg-transparent' id='faq'>
      <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
        <Title text='Frequently Asked Questions' />
        <Description text='Find answers to common questions about Ultra Reporter' />
      </div>
      <div className='mx-auto w-full max-w-[700px]'>
        <Accordion className='w-full' collapsible type='single'>
          {faq.faq.map((item: { question: string; answer: string }, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
