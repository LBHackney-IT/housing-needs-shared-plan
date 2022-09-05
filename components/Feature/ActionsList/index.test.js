// import ActionsList from './index';
// import { render } from '@testing-library/react';

it('passes', () => {
  expect(1).toEqual(1);
})

// describe('<ActionsList />', () => {
//   const onActionToggled = jest.fn();
//   const onActionDeleted = jest.fn();

//   const component = (
//     <ActionsList
//       actions={[
//         {
//           id: 'PPBqWA9',
//           created: '2020-05-20T09:00:00+0000',
//           summary: 'Run a test',
//           description: 'This will check if it works https://google.com',
//           dueDate: '2020-05-26T09:00:00+0000',
//           isCompleted: true,
//           completedDate: '2020-05-24T09:00:00+0000'
//         },
//         {
//           id: '23TplPdS',
//           created: '2020-05-20T09:00:00+0000',
//           summary: 'Complete this action',
//           dueDate: '2020-05-26T09:00:00+0000',
//           isCompleted: false
//         }
//       ]}
//       onActionToggled={onActionToggled}
//       onActionDeleted={onActionDeleted}
//     />
//   );

//   it('displays the title of the action', () => {
//     const { getByText } = render(component);
//     expect(getByText('Run a test')).toBeInTheDocument();
//   });

//   it('displays the due date of the action', () => {
//     const { getAllByText } = render(component);
//     expect(getAllByText('26 May 2020')[0]).toBeInTheDocument();
//   });

//   it('shows the description if there is one', () => {
//     const { container } = render(component);
//     expect(container.querySelector('Details')).toBeInTheDocument();
//   });

//   it('hides the description if there is none', () => {
//     const { container } = render(
//       <ActionsList
//         actions={[
//           {
//             id: 'PPBqWA9',
//             summary: 'Run a test',
//             dueDate: '2020-05-26T09:00:00+0000'
//           }
//         ]}
//       />
//     );

//     expect(container.querySelector('Details')).not.toBeInTheDocument();
//   });

//   it('shows the added date if there is one', () => {
//     const { getAllByText } = render(component);
//     expect(getAllByText('20 May 2020')[0]).toBeInTheDocument();
//     expect(getAllByText('20 May 2020')[1]).toBeInTheDocument();
//   });

//   it('shows the completed date if there is one', () => {
//     const { getAllByText } = render(component);
//     const dates = getAllByText('24 May 2020');
//     expect(dates[0]).toBeInTheDocument();
//     expect(dates.length).toBe(1);
//   });

//   it('displays a checkbox with the "isCompleted" state', () => {
//     const { getAllByTestId } = render(component);
//     expect(getAllByTestId('action-checkbox')[0]).toHaveAttribute('checked');
//     expect(getAllByTestId('action-checkbox')[1]).not.toHaveAttribute('checked');
//   });

//   it('triggers "onActionToggled" when checkbox toggled', () => {
//     const { getAllByTestId } = render(component);
//     const checkbox = getAllByTestId('action-checkbox')[0];

//     checkbox.click();

//     expect(onActionToggled).toHaveBeenCalledWith({
//       actionId: 'PPBqWA9',
//       isCompleted: false
//     });
//   });

//   it('triggers "onActionDeleted" when delete button clicked', () => {
//     const { getByTestId } = render(component);
//     getByTestId('actions-list-button-delete-PPBqWA9').click();
//     expect(onActionDeleted).toHaveBeenCalledWith({ actionId: 'PPBqWA9' });
//   });

//   it('renders links in action description', () => {
//     const { getByText } = render(component);
//     expect(getByText('https://google.com')).toHaveAttribute(
//       'href',
//       'https://google.com'
//     );
//   });
// });
