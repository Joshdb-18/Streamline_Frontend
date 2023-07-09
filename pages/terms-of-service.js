import Head from 'next/head';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Subheading = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin-bottom: 10px;
`;

const List = styled.ul`
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  margin-left: 20px;
`;

export default function TermOfService() {
  return (
    <>
      <Head>
        <title>Streamline | Terms of Service</title>
      </Head>
      <Container>
        <Heading>Website Terms and Conditions of Use</Heading>
        <Subheading>1. Terms</Subheading>
        <Paragraph>
          By accessing this Website, you are agreeing to be bound by these
          Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable
          local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials
          contained in this Website are protected by copyright and trademark law.
        </Paragraph>
        <Subheading>2. Use License</Subheading>
        <Paragraph>
          Permission is granted to temporarily download one copy of the materials on Streamline's Website for personal,
          non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this
          license you may not:
        </Paragraph>
        <List>
          <ListItem>- modify or copy the materials;</ListItem>
          <ListItem>- use the materials for any commercial purpose or for any public display;</ListItem>
          <ListItem>- attempt to reverse engineer any software contained on Streamline's Website;</ListItem>
          <ListItem>- remove any copyright or other proprietary notations from the materials; or</ListItem>
          <ListItem>- transferring the materials to another person or "mirror" the materials on any other server.</ListItem>
        </List>
        <Paragraph>
          This will let Streamline terminate upon violations of any of these restrictions. Upon termination, your viewing
          right will also be terminated, and you should destroy any downloaded materials in your possession whether it is
          printed or electronic format.
        </Paragraph>
        <Subheading>3. Disclaimer</Subheading>
        <Paragraph>
          All the materials on Streamline's Website are provided "as is". Streamline makes no warranties, may it be
          expressed or implied, therefore negates all other warranties. Furthermore, Streamline does not make any
          representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise
          relating to such materials or any sites linked to this Website.
        </Paragraph>
        <Subheading>4. Limitations</Subheading>
        <Paragraph>
          Streamline or its suppliers will not be held accountable for any damages that will arise with the use or
          inability to use the materials on Streamline's Website, even if Streamline or an authorized representative of
          this Website has been notified, orally or written, of the possibility of such damage. Some jurisdictions do not
          allow limitations on implied warranties or limitations of liability for incidental damages; these limitations
          may not apply to you.
        </Paragraph>
        <Subheading>5. Revisions and Errata</Subheading>
        <Paragraph>
          The materials appearing on Streamline's Website may include technical, typographical, or photographic errors.
          Streamline does not promise that any of the materials on this Website are accurate, complete, or current.
          Streamline may change the materials contained on its Website at any time without notice. Streamline does not
          make any commitment to update the materials.
        </Paragraph>
        <Subheading>6. Links</Subheading>
        <Paragraph>
          Streamline has not reviewed all of the sites linked to its Website and is not responsible for the contents of
          any such linked site. The presence of any link does not imply endorsement by Streamline of the site. The use of
          any linked website is at the user's own risk.
        </Paragraph>
        <Subheading>7. Site Terms of Use Modifications</Subheading>
        <Paragraph>
          Streamline may revise these Terms of Use for its Website at any time without prior notice. By using this
          Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
        </Paragraph>
        <Subheading>8. Your Privacy</Subheading>
        <Paragraph>Please read our Privacy Policy.</Paragraph>
        <Subheading>9. Governing Law</Subheading>
        <Paragraph>
          Any claim related to Streamline's Website shall be governed by the laws of ng without regards to its conflict
          of law provisions.
        </Paragraph>
      </Container>
    </>
  );
}
