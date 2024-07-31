import { Box, Flex, Spinner, useMediaQuery } from '@chakra-ui/react';
import { usePDF } from '@react-pdf/renderer';
import React from 'react';
import Invoice from '../../pages/Invoice';
import { IoMdDownload } from 'react-icons/io';
import { FaShareAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const InvoiceButton = ({ order, index }) => {
  const [instance, updateInstance] = usePDF({
    document: <Invoice order={order} index={index} />,
  });
  const [isMobileSize] = useMediaQuery('(max-width: 425px)');

  const handleShare = async (blob) => {
    if (navigator.share) {
      try {
        if (blob) {
          const file = new File([blob], 'invoice.pdf', {
            type: 'application/pdf',
          });
          await navigator.share({
            title: 'Invoice',
            text: 'Kindly find attached invoice',
            files: [file],
          });
          toast.success('Invoice shared successfully!');
        } else {
          toast.error('No blob available');
        }
      } catch (error) {
        toast.error('Error while sharing ');
      }
    } else {
      toast.error('Web Share API not supported');
    }
  };

  // if (instance.loading) {
  //   return <Spinner size='sm' />;
  // }

  if (instance.error) return <Box>Something went wrong: {instance.error}</Box>;

  return (
    <>
      <Flex
        cursor='pointer'
        bg='white'
        color='tomato'
        h='20px'
        w='20px'
        alignItems='center'
        justifyContent='center'
        borderRadius='2px'
      >
        <a
          href={instance.url}
          target='_blank'
          style={{ color: 'tomato', height: 'inherit' }}
        >
          <IoMdDownload />
        </a>
      </Flex>
      {isMobileSize && (
        <Flex
          cursor='pointer'
          bg='white'
          color='tomato'
          h='20px'
          w='20px'
          alignItems='center'
          justifyContent='center'
          borderRadius='2px'
          onClick={() => handleShare(instance.blob)}
        >
          <FaShareAlt style={{ height: '12px' }} />
        </Flex>
      )}
    </>
  );
};

export default InvoiceButton;
