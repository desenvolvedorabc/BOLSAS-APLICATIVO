import { AxiosPromise } from 'axios';

export default async function handleDownloadReport(
  serviceMethod: () => AxiosPromise,
  reportName: string,
): Promise<void> {
  await serviceMethod().then((response) => {
    const TYPE_EXTENSION = 'xlsx';

    const url = window.URL.createObjectURL(
      new Blob([response.data as BlobPart], {
        type: `application/${TYPE_EXTENSION}`,
      }),
    );

    const link = document.createElement('a');
    link.href = url;

    link.setAttribute('download', `${reportName}.${TYPE_EXTENSION}`);

    document.body.appendChild(link);
    link.click();
  });
}
