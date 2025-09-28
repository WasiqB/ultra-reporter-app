# Processing Step Components

A set of React components for displaying file processing steps with visual status indicators.

## Components

### ProcessingStepItem

A single processing step component that displays the step title, status icon, and optional progress information.

#### Props

```typescript
interface ProcessingStepItemProps {
  step: ProcessingStep;
  className?: string;
}
```

#### ProcessingStep Interface

```typescript
interface ProcessingStep {
  id: string;
  title: string;
  status: StepStatus;
  progress?: number;
  errorMessage?: string;
}

type StepStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'skipped';
```

#### Visual Indicators

- **Completed**: Green check icon (✓) with green background
- **Failed**: Red cross icon (✗) with red background  
- **Processing**: Blue spinning loader with blue background
- **Pending**: Gray clock icon with gray background
- **Skipped**: Grayed-out clock icon with muted background

#### Features

- **Status Icons**: Clear visual indicators for each step state
- **Progress Bar**: Shows progress percentage for processing steps
- **Error Messages**: Displays error details for failed steps
- **Status Badges**: Text badges showing the current status
- **Accessibility**: Proper ARIA labels and roles
- **Responsive**: Works on mobile and desktop

### ProcessingStepList

A container component that displays multiple processing steps in a vertical list.

#### Props

```typescript
interface ProcessingStepListProps {
  steps: ProcessingStep[];
  title?: string;
  className?: string;
}
```

#### Features

- **Step Management**: Handles multiple steps in sequence
- **Consistent Styling**: Uniform appearance across all steps
- **Accessibility**: Proper list semantics with ARIA labels

## Usage Examples

### Basic Usage

```tsx
import { ProcessingStepItem } from '@ultra-reporter/ui/components/processing-step-item';

const step = {
  id: '1',
  title: 'Parse XML file',
  status: 'completed'
};

<ProcessingStepItem step={step} />
```

### With Progress

```tsx
const processingStep = {
  id: '2',
  title: 'Creating JSON data',
  status: 'processing',
  progress: 65
};

<ProcessingStepItem step={processingStep} />
```

### With Error

```tsx
const failedStep = {
  id: '3',
  title: 'Generate report',
  status: 'failed',
  errorMessage: 'Invalid XML format detected'
};

<ProcessingStepItem step={failedStep} />
```

### Step List

```tsx
import { ProcessingStepList } from '@ultra-reporter/ui/components/processing-step-list';

const steps = [
  { id: '1', title: 'Check file format', status: 'completed' },
  { id: '2', title: 'Parse XML', status: 'processing', progress: 45 },
  { id: '3', title: 'Generate report', status: 'pending' }
];

<ProcessingStepList 
  steps={steps} 
  title="File Processing Steps" 
/>
```

## Step Status Flow

The typical flow for processing steps:

1. **pending** → **processing** → **completed**
2. **pending** → **processing** → **failed**
3. **pending** → **skipped** (when a previous step fails)

## Styling

The components use Tailwind CSS classes and follow the design system:

- **Colors**: Green (success), Red (error), Blue (processing), Gray (pending/skipped)
- **Spacing**: Consistent padding and margins
- **Typography**: Clear hierarchy with appropriate font weights
- **Transitions**: Smooth color and state transitions

## Accessibility

- Proper ARIA labels and roles
- Screen reader friendly status announcements
- Keyboard navigation support
- High contrast color combinations
- Progress bar with proper ARIA attributes

## TypeScript Support

Full TypeScript support with exported interfaces:

- `ProcessingStep`
- `StepStatus`
- `StepIconType`
- `StepIconConfig`
- `ProcessingStepItemProps`
- `ProcessingStepListProps`