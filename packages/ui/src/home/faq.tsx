import { Description } from '@/common/description';
import { Title } from '@/common/title';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/accordion';

const faqItems = [
  {
    question: 'What file formats does Ultra Reporter support?',
    answer:
      "Ultra Reporter currently supports only TestNG XML file formats for test results. We're working on expanding support for other formats in the future.",
  },
  {
    question: 'How long does it take to generate a report?',
    answer:
      'Report generation is nearly instantaneous. Most reports are generated within seconds, depending on the size and complexity of your test results.',
  },
];

export const FAQ = (): JSX.Element => {
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
          {faqItems.map((item, index) => (
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
