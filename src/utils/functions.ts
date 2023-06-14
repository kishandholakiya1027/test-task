export const filterAppInfoData = (data: AppInfo[]) => {
  return data.map((item) => ({
    ...item,
    appName: item.Tags["app-name"],
    environment: item.Tags.environment,
    businessUnit: item.Tags["business-unit"],
  }))
}