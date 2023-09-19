import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";

export default function MyDatePicker({
  label,
  description,
  errorMessage,
  ...props
}) {
  return (
    <DatePicker {...props}>
      <Label>{label}</Label>
      <Group>
        <DateInput>{(segment) => <DateSegment segment={segment} />}</DateInput>
        <Button>▼</Button>
      </Group>
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
      <Popover>
        <Dialog>
          <Calendar>
            <header>
              <Button slot="previous">◀</Button>
              <Heading />
              <Button slot="next">▶j</Button>
            </header>
            <CalendarGrid>
              {(date) => <CalendarCell date={date} />}
            </CalendarGrid>
            {errorMessage && <Text slot="errorMessage">{errorMessage}</Text>}
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
}
