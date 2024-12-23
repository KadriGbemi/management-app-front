import { useApiRequest } from '../../api'
import { Loading } from '../LoadingState'
import { Empty } from '../EmptyState'
import { Employee } from '../../types/EmployeeType'

const EmployeesList = () => {
  const { data: employees, loading } = useApiRequest<Employee[]>('/employees', 'GET')

  return (
    <>
      <div className='flex justify-between items-center gap-4'>
        <div>
          <h3 className='font-medium text-lg'>Employees</h3>
          <p>A list of all the employees including their first and last name and their contact information.</p>
        </div>
      </div>

      <div className='pt-4 pb-10'>
        <div className='bg-white rounded-xl gap-4 grid grid-cols-1 text-left rtl:text-right w-full shadow-lg pt-6'>
          <Loading isLoading={loading} className='my-8'>
            {employees?.length ? (
              <table className='table-auto text-sm w-full'>
                <thead className='text-xs text-secondary uppercase border-b border-secondary/10'>
                  <tr>
                    <th scope='col' className='px-8 py-6'>
                      First name
                    </th>
                    <th scope='col' className='px-8 py-6 hidden md:table-cell'>
                      Last name
                    </th>
                    <th scope='col' className='px-8 py-6'>
                      Company
                    </th>
                    <th scope='col' className='hidden md:table-cell md:px-8 md:py-6'>
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employees?.map((employee, index) => (
                    <tr
                      key={employee.id}
                      className={`odd:bg-white even:bg-secondary/5 rounded-bl-lg rounded-br-lg ${
                        employees?.length - 1 !== index ? 'border-b border-secondary/10' : ''
                      } `}
                    >
                      <td className='px-8 py-4 whitespace-nowrap'>{employee.first_name}</td>
                      <td className='px-8 hidden md:table-cell'> {employee.last_name}</td>
                      <td className='px-8 py-4'> {employee.company}</td>
                      <td className='px-8 hidden md:table-cell'>
                        {employee?.img ? (
                          <div className='space-x-2 text-nowrap'>
                            <img
                              alt=''
                              src={employee?.img}
                              className='inline-block size-8 rounded-full ring-2 ring-white'
                            />
                            <span>{employee?.contact}</span>
                          </div>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Empty />
            )}
          </Loading>
        </div>
      </div>
    </>
  )
}

export default EmployeesList
