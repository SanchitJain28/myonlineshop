export default function OrdersList() {
    // Mock data for orders
    const orders = [
      {
        id: "ORD-001",
        date: "2023-05-15",
        customer: "John Doe",
        total: 129.99,
        status: "Delivered",
        items: 3,
      },
      {
        id: "ORD-002",
        date: "2023-05-14",
        customer: "Jane Smith",
        total: 79.5,
        status: "Processing",
        items: 2,
      },
      {
        id: "ORD-003",
        date: "2023-05-13",
        customer: "Robert Johnson",
        total: 249.99,
        status: "Shipped",
        items: 1,
      },
      {
        id: "ORD-004",
        date: "2023-05-12",
        customer: "Emily Davis",
        total: 54.25,
        status: "Delivered",
        items: 4,
      },
      {
        id: "ORD-005",
        date: "2023-05-11",
        customer: "Michael Wilson",
        total: 199.99,
        status: "Processing",
        items: 2,
      },
    ]
  
    const getStatusColor = (status) => {
      switch (status) {
        case "Delivered":
          return "bg-green-100 text-green-800"
        case "Processing":
          return "bg-yellow-100 text-yellow-800"
        case "Shipped":
          return "bg-blue-100 text-blue-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    }
  
    return (
      <div>
        <h2 className="mb-4 text-lg font-medium text-gray-800">Recent Orders</h2>
  
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Items
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{order.items}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {orders.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}
      </div>
    )
  }
  