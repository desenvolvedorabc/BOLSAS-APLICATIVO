import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type Props = {
  children: ReactNode;
};

const positions = {
  year: 1,
  edition: 2,
  county: 3,
  school: 4,
  'school-class': 5,
};

type breadcrumbContextType = {
  breadcrumb: unknown[];
  mapBreadcrumb: unknown[];
  addBreadcrumbs: (id: string, name: string, level: string) => void;
  subtractBreadcrumbs: (id: string, level: string) => void;
  resetBreadcrumbs: () => void;
  changeSerie: (serie: string) => void;
  changeYear: (year: string) => void;
  changeEdition: (edition: unknown) => void;
  changeCounty: (county: unknown) => void;
  changeSchool: (school: unknown) => void;
  changeSchoolClass: (schoolClass: unknown) => void;
  showBreadcrumbs: () => void;
  hideBreadcrumbs: () => void;
  handleClickBar: () => void;
  handleClickBreadcrumb: (clickBreadcrumb: boolean) => void;
  handleUnClickBar: () => void;
  setIsUpdateData: (value: boolean) => void;
  clickBar: boolean;
  clickBreadcrumb: boolean;
  visibleBreadcrumbs: boolean;
  serie: unknown;
  year: unknown;
  edition: unknown;
  county: unknown;
  school: unknown;
  schoolClass: unknown;
  indexYear: number;
  indexEdition: number;
  indexCounty: number;
  indexSerie: number;
  indexSchool: number;
  indexSchoolClass: number;
  isUpdateData: boolean;
};

const breadcrumbContextDefaultValues: breadcrumbContextType = {
  breadcrumb: [],
  mapBreadcrumb: [],
  addBreadcrumbs: () => {
    /* TODO document why this method 'addBreadcrumbs' is empty */
  },
  subtractBreadcrumbs: () => {
    /* TODO document why this method 'subtractBreadcrumbs' is empty */
  },
  resetBreadcrumbs: () => {
    /* TODO document why this method 'resetBreadcrumbs' is empty */
  },
  changeSerie: () => {
    /* TODO document why this method 'changeSerie' is empty */
  },
  changeYear: () => {
    /* TODO document why this method 'changeYear' is empty */
  },
  changeEdition: () => {
    /* TODO document why this method 'changeEdition' is empty */
  },
  changeCounty: () => {
    /* TODO document why this method 'changeCounty' is empty */
  },
  changeSchool: () => {
    /* TODO document why this method 'changeSchool' is empty */
  },
  changeSchoolClass: () => {
    /* TODO document why this method 'changeSchoolClass' is empty */
  },
  showBreadcrumbs: () => {
    /* TODO document why this method 'showBreadcrumbs' is empty */
  },
  hideBreadcrumbs: () => {
    /* TODO document why this method 'hideBreadcrumbs' is empty */
  },
  handleClickBar: () => {
    /* TODO document why this method 'handleClickBar' is empty */
  },
  handleUnClickBar: () => {
    /* TODO document why this method 'handleUnClickBar' is empty */
  },
  handleClickBreadcrumb: () => {
    /* TODO document why this method 'handleClickBreadcrumb' is empty */
  },
  setIsUpdateData: () => {
    return;
  },
  serie: null,
  year: null,
  edition: null,
  county: null,
  school: null,
  schoolClass: null,
  indexYear: null,
  indexEdition: null,
  indexCounty: null,
  indexSchool: null,
  indexSerie: null,
  isUpdateData: null,
  indexSchoolClass: null,
  visibleBreadcrumbs: false,
  clickBar: false,
  clickBreadcrumb: false,
};

const BreadcrumbContext = createContext<breadcrumbContextType>(
  breadcrumbContextDefaultValues,
);

export function useBreadcrumbContext() {
  return useContext(BreadcrumbContext);
}

export function BreadcrumbProvider({ children }: Props) {
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [mapBreadcrumb, setMapBreadcrumbs] = useState([]);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [serie, setSerie] = useState(null);
  const [year, setYear] = useState(null);
  const [edition, setEdition] = useState(null);
  const [county, setCounty] = useState(null);
  const [school, setSchool] = useState(null);
  const [schoolClass, setSchoolClass] = useState(null);
  const [visibleBreadcrumbs, setVisibleBreadcrumbs] = useState(null);
  const [clickBar, setClickBar] = useState(null);
  const [clickBreadcrumb, setClickBreadcrumb] = useState(null);

  const addBreadcrumbs = (_id: string, _name: string, _level: string) => {
    let exist = false;
    let position = 0;
    let find = false;

    for (const element of breadcrumb) {
      if (element.level === _level) {
        exist = true;
      }
    }

    for (const element of breadcrumb) {
      if (element.level === _level) {
        const newBreadcrumb = breadcrumb.map((el, index) => {
          if (el.level === _level) {
            position = index;
            find = true;
            return { ...el, id: _id, name: _name };
          } else return el;
        });
        find
          ? setBreadcrumb(newBreadcrumb.slice(0, position + 1))
          : setBreadcrumb(newBreadcrumb);
      }
    }

    if (_id && exist === false) {
      setBreadcrumb([
        ...breadcrumb,
        { id: _id, name: _name, level: _level, position: positions[_level] },
      ]);
    }

    const verify = breadcrumb.find((data) => data.position > positions[_level]);

    if (verify) {
      setBreadcrumb((oldValue) =>
        oldValue.filter((data) => data.position <= positions[_level]),
      );
    }

    if (!_id) {
      setBreadcrumb((oldValue) =>
        oldValue.filter((data) => data.level !== _level),
      );
    }
  };

  const subtractBreadcrumbs = (id: string, level: string) => {
    const filterData = breadcrumb.filter(
      (data) => data.position <= positions[level],
    );

    setBreadcrumb(filterData);
    setMapBreadcrumbs(filterData);

    setVisibleBreadcrumbs(true);
  };

  const showBreadcrumbs = () => {
    setVisibleBreadcrumbs(true);
    setIsUpdateData(true);
    setMapBreadcrumbs(breadcrumb);
  };

  const hideBreadcrumbs = () => {
    setVisibleBreadcrumbs(false);
  };

  const handleClickBar = () => {
    setClickBar(true);
    showBreadcrumbs();
  };

  const handleClickBreadcrumb = (_clickBreadcrumb: boolean) => {
    setClickBreadcrumb(_clickBreadcrumb);
  };

  const handleUnClickBar = () => {
    setClickBar(false);
  };

  const resetBreadcrumbs = () => {
    setBreadcrumb([]);
    setMapBreadcrumbs([]);
  };

  useEffect(() => {
    if (clickBar) {
      setIsUpdateData(true);
      setMapBreadcrumbs(breadcrumb);
    }
  }, [clickBar, breadcrumb]);

  const changeYear = useCallback(
    (_year: string) => {
      setYear(_year);
    },
    [setYear],
  );

  const changeEdition = useCallback(
    (_edition: string) => {
      setEdition(_edition);
    },
    [setEdition],
  );

  const changeSerie = useCallback(
    (_serie: string) => {
      setSerie(_serie);
    },
    [setSerie],
  );

  const changeCounty = useCallback(
    (_county: string) => {
      setCounty(_county);
    },
    [setCounty],
  );

  const changeSchool = useCallback(
    (_school: string) => {
      setSchool(_school);
    },
    [setSchool],
  );

  const changeSchoolClass = useCallback(
    (_schoolClass: string) => {
      setSchoolClass(_schoolClass);
    },
    [setSchoolClass],
  );

  const indexSerie = breadcrumb
    .map(function (e) {
      return e.level;
    })
    .indexOf('serie');
  const indexYear = breadcrumb
    .map(function (e) {
      return e.level;
    })
    .indexOf('year');
  const indexEdition = breadcrumb
    .map(function (e) {
      return e.level;
    })
    .indexOf('edition');
  const indexCounty = breadcrumb
    .map(function (e) {
      return e.level;
    })
    .indexOf('county');
  const indexSchool = breadcrumb
    .map(function (e) {
      return e.level;
    })
    .indexOf('school');
  const indexSchoolClass = breadcrumb
    .map(function (e) {
      return e.level;
    })
    .indexOf('school-class');

  const value = {
    breadcrumb,
    mapBreadcrumb,
    addBreadcrumbs,
    subtractBreadcrumbs,
    resetBreadcrumbs,
    serie,
    year,
    edition,
    county,
    school,
    schoolClass,
    changeSerie,
    setIsUpdateData,
    isUpdateData,
    changeYear,
    changeEdition,
    changeCounty,
    changeSchool,
    changeSchoolClass,
    indexYear,
    indexEdition,
    indexCounty,
    indexSchool,
    indexSchoolClass,
    showBreadcrumbs,
    hideBreadcrumbs,
    visibleBreadcrumbs,
    handleClickBar,
    handleUnClickBar,
    indexSerie,
    handleClickBreadcrumb,
    clickBar,
    clickBreadcrumb,
  };
  return (
    <>
      <BreadcrumbContext.Provider value={value}>
        {children}
      </BreadcrumbContext.Provider>
    </>
  );
}
