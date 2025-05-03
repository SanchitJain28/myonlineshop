const handleLoadingComplete = () => {
    setLoading(false);
  };
  const categories = [
    "T-Shirts & Tops",
    "Shirts & Blouses",
    "Jeans & Trousers",
    "Dresses & Ethnic Wear",
    "Jackets & Hoodies",
    "Activewear & Sportswear",
    "Nightwear & Loungewear",
    "Accessories",
  ];

  const fetchProductsByCategory = async () => {
    setLoading(true);
    try {
      const category = encodeURIComponent(activeTab);
      const {
        data: { data },
      } = await axiosInstance.get(
        `/api/get-product-by-category?category=${category}`
      );
      setProducts(() => [...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductsByCategory();
  }, [activeTab]);

  if (loading) {
    return (
      <LoadingScreen
        onLoadingComplete={handleLoadingComplete}
        minLoadingTime={2500}
        maxLoadingTime={4000}
      />
    );
  }