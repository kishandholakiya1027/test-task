import { useState } from "react"
import { api } from "../axios"
import { GridColDef } from '@mui/x-data-grid';
import { filterAppInfoData } from "../utils/functions";

export const useData = () => {
  const [raw, setraw] = useState<AppInfo[]>([])
  const [applications, setapplications] = useState<String[]>([])
  const [resources, setresources] = useState<String[]>([])

  const getRaw = async () => {
    try {
      const res = await api('raw', 'GET');
      setraw(filterAppInfoData(res.data))
    } catch (e) {
      console.log(e);
    }
  }

  const getApplications = async () => {
    try {
      const res = await api('applications', 'GET');
      setapplications(res.data)
    } catch (e) {
      console.log(e);
    }
  }

  const getResources = async () => {
    try {
      const res = await api('resources', 'GET');
      setresources(res.data)
    } catch (e) {
      console.log(e);
    }
  }

  return {
    raw,
    applications,
    resources,
    getRaw,
    getApplications,
    getResources,
    columns,
  }
}

const columns: GridColDef[] = [
  { field: 'ConsumedQuantity', headerName: 'Consumed Quantity', width: 160, type: 'number' },
  { field: 'Cost', headerName: 'Cost', width: 90, type: 'number' },
  { field: 'Date', headerName: 'Date', width: 100 },
  {
    field: 'InstanceId',
    headerName: 'Instance Id',
    width: 90,
  },
  {
    field: 'MeterCategory',
    headerName: 'Meter Category',
    width: 120,
  },
  {
    field: 'ResourceGroup',
    headerName: 'Resource Group',
    width: 120,
  },
  {
    field: 'ResourceLocation',
    headerName: 'Resource Location',
    width: 140,
  },
  {
    field: 'appName',
    headerName: 'App Name',
    width: 100,
  },
  {
    field: 'environment',
    headerName: 'Environment',
    width: 100,
  },
  {
    field: 'businessUnit',
    headerName: 'Business Unit',
    width: 100,
  },
  {
    field: 'UnitOfMeasure',
    headerName: 'Unit Of Measure',
    width: 120,
  },
  {
    field: 'Location',
    headerName: 'Location',
    width: 100,
  },
  {
    field: 'ServiceName',
    headerName: 'Service Name',
    width: 120,
  },
];